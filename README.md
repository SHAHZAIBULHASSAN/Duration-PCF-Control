The DurationControl is a custom PowerApps Component Framework (PCF) control that allows users to select a time duration using a dropdown menu. The control provides predefined time intervals between 10 minutes and 8 hours, formatted in a human-readable way.

Features
Provides a dropdown list with durations ranging from 10 minutes to 8 hours.
Ensures accessibility with appropriate labels and attributes.
Uses a consistent step of 10 minutes for selection.
Formats time durations in a concise manner (e.g., "1h 30m" instead of "90 minutes").
Dynamically updates its value when the context changes.
Notifies the framework when the selected duration changes.
Implementation Details
Initialization (init method)
Parameters:
context: The component framework context.
notifyOutputChanged: Callback function to notify PowerApps of data changes.
state: Persistent state storage (not used in this implementation).
container: The parent HTML container for the control.
Actions:
Creates a <div> container for styling and structure.
Creates a <label> for accessibility and user guidance.
Creates a <select> dropdown with predefined time intervals.
Populates the dropdown with options in a short readable format.
Appends elements to the parent container.
Dropdown Population (populateDropdownOptions method)
Generates time duration options from 10 minutes to 8 hours.
Uses formatDurationShort to convert minutes into human-readable strings.
Adds options dynamically to the <select> element.
Duration Formatting (formatDurationShort method)
Converts time into Xh Ym format.
Example: 90 minutes → 1h 30m
Example: 60 minutes → 1h
Example: 30 minutes → 30m
Updating the View (updateView method)
Retrieves and validates the duration parameter from the framework.
Clamps the value between MIN_DURATION (10 min) and MAX_DURATION (480 min).
Updates the dropdown to reflect the current duration.
Handling User Input (onDurationChange method)
Listens for changes in the dropdown.
Ensures the selected value is within valid bounds.
Updates the duration value and notifies PowerApps.
Output Handling (getOutputs method)
Returns the selected duration as an output value for PowerApps.
Cleanup (destroy method)
Removes event listeners to prevent memory leaks.
Configuration and Usage
This control can be embedded in a PowerApps form.
The output value (duration) can be used for scheduling, reminders, or time-based calculations.
Constraints
Only supports predefined time increments (10 min to 8 hours).
Does not allow manual text input—users must select from the dropdown.
Designed for PowerApps environments supporting PCF controls.
Output:
           



Future Enhancements
Add a custom step interval setting.
Allow localization for different time formats.
Include a default duration setting from user preferences.
This document serves as a technical and functional reference for developers and users integrating DurationControl into their PowerApps solutions.
