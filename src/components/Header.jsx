import React, { useCallback, useEffect, useRef } from 'react';
import { AuthApi } from '../shared/api';
import { useCookies } from 'react-cookie';
import ReactCanvasConfetti from 'react-canvas-confetti';
import { Link, useNavigate } from 'react-router-dom';
import * as C from '../styles/common';

const Header = () => {
    const [cookies, setCookie, removeCookie] = useCookies();
    const navigate = useNavigate();
    const logout = () => {
        AuthApi.signout(cookies.Authorization);
        removeCookie('Authorization');
    };

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
        <C.Header>
            <p className="txtWelcome">환영합니다🎉 갓생러 님</p>

            <div className="imsi">
                <h1>
                    <Link to="/">갓생러헤더</Link>
                </h1>
                <button className="btnLogout" onClick={logout} style={{ border: '1px solid #ddd' }}>
                    로그아웃
                </button>
                <button
                    onClick={() => {
                        navigate('/login');
                    }}
                >
                    로그인
                </button>

                <button className="btnfire" onClick={fire} style={{ border: '1px solid #ddd' }}>
                    폭죽터뜨리기
                </button>
            </div>

            <ReactCanvasConfetti refConfetti={getInstance} style={canvasStyles} />
        </C.Header>
    );
};

export default Header;
