import { secondsToMinutes } from "../utils/secondsToMinutes";

interface TimerProps {
    mainTime: number
}

export function Timer(props: TimerProps): JSX.Element {
    return (
        <div className="timer">
            {secondsToMinutes(props.mainTime)}
        </div>
    );
}