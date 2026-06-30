import styles from "./ServiceCard.module.css";

function ServiceCard(props) {

    return (

        <div className={styles.card}>

            <img
                src={props.image}
                alt={props.title}
                className={styles.image}
            />

            <div className={styles.content}>

                <h3>{props.title}</h3>

                <p>{props.description}</p>


            </div>

        </div>

    );

}

export default ServiceCard;