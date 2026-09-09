const MacroCard = ({ icon, name, current, target, unit }) => {
    return (
        <article className='macro'>
            {icon}
            <div className='macro__details'>
                <p>{name}</p>
                <p>
                    {current} / {target} {unit}
                </p>

                <div className='macro__progress'>
                    <span>{Math.round((current / target) * 100)}%</span>
                </div>
            </div>
        </article>
    );
};

export default MacroCard;
