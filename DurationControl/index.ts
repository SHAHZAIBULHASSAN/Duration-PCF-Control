import { IInputs, IOutputs } from "./generated/ManifestTypes";

export class DurationControl implements ComponentFramework.StandardControl<IInputs, IOutputs> {
    private container: HTMLDivElement;
    private dropdown: HTMLSelectElement;
    private notifyOutputChanged: () => void;
    private duration: number;
    private readonly MIN_DURATION: number = 10; // Start at 10 minutes
    private readonly MAX_DURATION: number = 480; // Maximum 8 hours
    private readonly STEP: number = 10; // Increment by 10 minutes

    constructor() {}

    /**
     * Initialize the control
     */
    public init(
        context: ComponentFramework.Context<IInputs>,
        notifyOutputChanged: () => void,
        state: ComponentFramework.Dictionary,
        container: HTMLDivElement
    ): void {
        this.notifyOutputChanged = notifyOutputChanged;

        // Create main container
        this.container = document.createElement("div");
        this.container.classList.add("duration-selector-container", "flex", "flex-col", "items-center", "gap-6");

        // Create label for accessibility
        const label = document.createElement("label");
        label.htmlFor = "duration-dropdown";
        label.textContent = "Select Duration:";
        label.classList.add("text-sm", "font-medium", "text-gray-700");
        label.setAttribute("aria-label", "Select a duration in minutes or hours");

        // Create dropdown element
        this.dropdown = document.createElement("select");
        this.dropdown.id = "duration-dropdown";
        this.dropdown.classList.add(
            "duration-dropdown",
            "block",
            "w-full",
            "max-w-[200px]",
            "px-4",
            "py-2",
            "border",
            "border-gray-300",
            "rounded-md",
            "shadow-sm",
            "focus:outline-none",
            "focus:ring-indigo-500",
            "focus:border-indigo-500",
            "sm:text-sm",
            "transition-all",
            "duration-300"
        );
        this.dropdown.setAttribute("aria-labelledby", "duration-dropdown");
        this.dropdown.addEventListener("change", this.onDurationChange.bind(this));

        // Populate dropdown options
        this.populateDropdownOptions();

        // Append elements to the container
        this.container.appendChild(label);
        this.container.appendChild(this.dropdown);

        // Append container to parent
        container.appendChild(this.container);
    }

    /**
     * Populate dropdown with shortened duration options
     */
    private populateDropdownOptions(): void {
        for (let i = this.MIN_DURATION; i <= this.MAX_DURATION; i += this.STEP) {
            const option = document.createElement("option");
            option.value = i.toString();
            option.textContent = this.formatDurationShort(i); // Shortened format
            this.dropdown.appendChild(option);
        }
    }

    /**
     * Format duration into a short human-readable string
     */
    private formatDurationShort(minutes: number): string {
        const hours = Math.floor(minutes / 60);
        const remainingMinutes = minutes % 60;

        if (hours > 0 && remainingMinutes > 0) {
            return `${hours}h ${remainingMinutes}m`;
        } else if (hours > 0) {
            return `${hours}h`;
        } else {
            return `${minutes}m`;
        }
    }

    /**
     * Update the view based on the data
     */
    public updateView(context: ComponentFramework.Context<IInputs>): void {
        const rawDuration = context.parameters.duration.raw || this.MIN_DURATION;

        // Validate and clamp the value within the allowed range
        this.duration = Math.min(Math.max(rawDuration, this.MIN_DURATION), this.MAX_DURATION);

        // Set the dropdown value
        this.dropdown.value = this.duration.toString();
    }

    /**
     * Triggered when the user selects a new duration
     */
    private onDurationChange(): void {
        const selectedValue = Number(this.dropdown.value);

        // Validate the selected value
        if (!isNaN(selectedValue) && selectedValue >= this.MIN_DURATION && selectedValue <= this.MAX_DURATION) {
            this.duration = selectedValue;
            this.notifyOutputChanged();
        } else {
            console.warn("Invalid duration selected:", selectedValue);
        }
    }

    /**
     * Return the updated value to the framework
     */
    public getOutputs(): IOutputs {
        return {
            duration: this.duration
        };
    }

    /**
     * Cleanup when the control is destroyed
     */
    public destroy(): void {
        this.dropdown.removeEventListener("change", this.onDurationChange.bind(this));
    }
}