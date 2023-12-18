import Image from 'next/image';

import classes from './event-item.module.css';
import Button from "../ui/button";
import DateIcon from "../icons/date-icon";
import AddressIcon from '../icons/address-icon';
import ArrowRightIcon from '../icons/arrow-right-icon';

function EventItem(props) {

    return (
        <li className={classes.item}>
            <Image src={'/' + props.image} alt={props.title} width={250} height={160} />
            <div className={classes.content}>
                <div className={classes.summary}>
                    <h2>{props.title}</h2>
                    <div className={classes.date}>
                        <DateIcon />
                        <time>{props.date}</time>
                    </div>
                    <div className={classes.address}>
                        <AddressIcon />
                        <address>{props.location}</address>
                    </div>
                </div>

                <div className={classes.actions}>
                    <Button link={'/events/' + props.id} 
                        id={props.id}
                        title={props.title}
                        location={props.location}
                        date={props.date}
                        image={props.image} 
                    >
                        <span>Explore event</span>
                        <span className={classes.icon}>
                            <ArrowRightIcon />
                        </span>
                    </Button>
                </div>

            </div>
        </li>
    );
}

export default EventItem;