const SelectionCard = ({ variant, icon: Icon, label, description, selected, onClick }) => {
    return (
        <button
            type='button'
            className={`selection-card selection-card--${variant} ${selected ? "selection-card--selected" : ""}`}
            onClick={onClick}
            aria-pressed={selected}
        >
            <Icon className='selection-card__icon' size={32} strokeWidth={2} aria-hidden='true' />

            <span className='selection-card__label'>{label}</span>

            <span className='selection-card__description'>{description}</span>
        </button>
    );
};

export default SelectionCard;
