import "../css/current-card.css"

const CurrentCard = (card) => {

    const cardData = card?.card ?? '';

    return (
        <div className="card">
            <div className="top">
                <div>
                    <p className="name">{cardData.name}</p>
                    <p className="flavor">{cardData.flavor} </p>
                </div>
                <img alt={cardData.name} className="card-icon" src={cardData.img} />
            </div>
            <div className="bottom">
                <p className="effect">At the end of your turn, add a Dream Card to your hand.</p>
            </div>
        </div>
    );
};

export default CurrentCard;