import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './CustomDatePicker.css'; // Asegúrate de crear este archivo CSS

const CustomDatePicker = ({
    selectedFecha,
    handleDateChange,
    minDate,
    maxDate,
    dateFormat,
    placeholderText,
    disabled,
    filterDate
}) => {
    return (
        <div className="custom-datepicker-container">
            <DatePicker
                selected={selectedFecha}
                onChange={handleDateChange}
                minDate={minDate}
                maxDate={maxDate}
                dateFormat={dateFormat}
                placeholderText={placeholderText}
                disabled={disabled}
                className="custom-datepicker-input"
                calendarClassName="custom-datepicker-calendar"
                popperClassName="custom-datepicker-popper"
                popperPlacement="bottom-start"
                showPopperArrow={false}
                isClearable={false}
                shouldCloseOnSelect={true}
                filterDate={filterDate}
            />
        </div>
    );
};

export default CustomDatePicker;