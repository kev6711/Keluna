const MacroCard = ({ icon, name, current, target, unit }) => {
    const percentage = Math.round((current / target) * 100);
    const progressWidth = Math.min(percentage, 100);

    return (
        <article className='macro'>
            <div className='macro__icon'>{icon}</div>
            <div className='macro__details'>
                <h3>{name}</h3>
                <p>
                    <span className='macro__details--current'>{current}</span>/ {target} {unit}
                </p>

                <div className='macro__progress-wrapper'>
                    <div className='macro__progress'>
                        <div className='macro__progress--bar' style={{ width: `${progressWidth}%` }}></div>
                    </div>
                    <span className='macro__progress--percentage'>{percentage}%</span>
                </div>
            </div>
        </article>
    );
};

export default MacroCard;
