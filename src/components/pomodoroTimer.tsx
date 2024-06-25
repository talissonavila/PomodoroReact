import { useEffect, useState, useCallback } from "react";
import { useInterval } from "../hooks/useInterval";
import { Button } from "./button";
import { Timer } from "./timer";

import startSong from '../sounds/bell-start.mp3'
import finishSong from '../sounds/bell-finish.mp3'
import { secondsToTime } from "../utils/secondsToTIme";

const audioStartTime = new Audio(startSong)
const audioFinishTime = new Audio(finishSong)


interface TimerProps {
    defaultPomodoroTimer: number;
    shortRestTime: number;
    longRestTime: number;
    cycles: number;
}

export function PomodoroTimer(props: TimerProps): JSX.Element {
    const [mainTime, setMainTime] = useState(props.defaultPomodoroTimer);
    const [timeCounting, setTimeCounting] = useState(false);
    const [working, setWorking] = useState(false);
    const [resting, setResting] = useState(false);
    const [cyclesLengthManager, setCyclesLengthManager] = useState(new Array(props.cycles - 1).fill(true),
    );

    const [completedCyles, setCompletedCyles] = useState(0);
    const [fullWorkingTime, setFullWorkingTime] = useState(0);
    const [numberOfPomodoros, setNumberOfPomodoros] = useState(0);

    useInterval(() => {
        setMainTime(mainTime - 1);
        if (working) {
            setFullWorkingTime(fullWorkingTime + 1);
        }
    }, timeCounting ? 1000 : null,
    );

    const configureWork = useCallback(() => {
        setTimeCounting(true);
        setWorking(true);
        setResting(false);
        setMainTime(props.defaultPomodoroTimer);
        audioStartTime.play();
    }, [setTimeCounting, setWorking, setResting, setMainTime, props.defaultPomodoroTimer]);

    const configureRest = useCallback((long: boolean) => {
        setTimeCounting(true);
        setWorking(false);
        setResting(true);
        if (long) {
            setMainTime(props.longRestTime);
        }
        else {
            setMainTime(props.shortRestTime)
        }
        audioFinishTime.play();
    }, [setTimeCounting, setWorking, setResting, setMainTime, props.longRestTime, props.shortRestTime]);

    useEffect(() => {
        if (working) {
            document.body.classList.add('working');
        }
        if (resting) {
            document.body.classList.remove('working');
        }
        if (mainTime > 0) return;
        if (working && cyclesLengthManager.length > 0) {
            configureRest(false);
            cyclesLengthManager.pop();
        } else if (working && cyclesLengthManager.length <= 0) {
            configureRest(true);
            setCyclesLengthManager(new Array(props.cycles - 1).fill(true));
            setCompletedCyles(completedCyles + 1);
        }
        if (working) setNumberOfPomodoros(numberOfPomodoros + 1);
        if (resting) configureWork();
    }, [working,
        resting,
        mainTime,
        cyclesLengthManager,
        numberOfPomodoros,
        completedCyles,
        configureRest,
        setCyclesLengthManager,
        configureWork,
        props.cycles,
    ]);

    return (
        <div className="pomodoro">
            <h2>You are: {working ? 'working' : 'resting'}.</h2>
            <Timer mainTime={mainTime} />

            <div className="controls">
                <Button
                    text="Work"
                    onClick={() => configureWork()}
                />

                <Button
                    text="Rest"
                    onClick={() => configureRest(false)}
                />

                <Button
                    className={!working && !resting ? 'hidden' : ''}
                    text={timeCounting ? 'Pause' : 'Play'}
                    onClick={() => setTimeCounting(!timeCounting)}
                />
            </div>
            <div className="details">
                <p>Concluded Cyles: {completedCyles}.</p>
                <p>Total Pomodoro Time: {secondsToTime(fullWorkingTime)}.</p>
                <p>Number of pomodoros concluded: {numberOfPomodoros}.</p>
            </div>
        </div>
    )
}