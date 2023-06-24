import React, { useCallback, useEffect, useRef } from 'react';
import ReactCanvasConfetti from 'react-canvas-confetti';
import * as M from '../../styles/member';
import { Link } from 'react-router-dom';
const JoinDone = () => {
    const refAnimationInstance = useRef(null);

    const getInstance = useCallback(instance => {
        refAnimationInstance.current = instance;
    }, []);

    const makeShot = useCallback((particleRatio, opts) => {
        refAnimationInstance.current &&
            refAnimationInstance.current({
                ...opts,
                origin: { y: 0.7 },
                particleCount: Math.floor(200 * particleRatio),
            });
    }, []);

    const canvasStyles = {
        position: 'fixed',
        pointerEvents: 'none',
        width: '100%',
        height: '100%',
        top: 0,
        left: 0,
    };

    const fire = useCallback(() => {
        makeShot(0.25, {
            spread: 26,
            startVelocity: 55,
        });

        makeShot(0.2, {
            spread: 60,
        });

        makeShot(0.35, {
            spread: 100,
            decay: 0.91,
            scalar: 0.8,
        });

        makeShot(0.1, {
            spread: 120,
            startVelocity: 25,
            decay: 0.92,
            scalar: 1.2,
        });

        makeShot(0.1, {
            spread: 120,
            startVelocity: 45,
        });
    }, [makeShot]);

    useEffect(() => {
        fire();
    }, []);
    return (
        <M.JoinDone>
            <div className="message">
                <p>회원가입완료</p>
                <span>함께 갓생러가 되어보아요~</span>

                <Link to="/login">🥰 로그인 하러가기</Link>
            </div>
            <ReactCanvasConfetti refConfetti={getInstance} style={canvasStyles} />
            {/* <button className="btnfire" onClick={fire} style={{ border: '1px solid #ddd' }}>
                    폭죽터뜨리기
                </button> */}
        </M.JoinDone>
    );
};

export default JoinDone;
