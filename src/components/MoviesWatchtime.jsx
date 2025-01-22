import React from 'react';
import CountUp from 'react-countup';

const MoviesWatchtime = () => {
    return (
        <div className="card lg:card-side bg-base-100 shadow-xl pb-4 ">
            <figure className='w-[400px] h-full object-cover mx-auto'>
                <img
                    src={'https://images.unsplash.com/photo-1691480213129-106b2c7d1ee8?q=80&w=1180&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'}
                    alt="Album" />
            </figure>
            <div className="card-body">
                <h2 className="card-title justify-center text-4xl lg:mt-20">Total Watchtime</h2>
                <div className='grow flex justify-center items-center lg:mb-20'>
                    {/* <h2 className='p-4 border '>570+</h2> */}
                    <CountUp
                        start={0}
                        end={57506}
                        duration={16}
                        suffix="+"
                        enableScrollSpy={true}
                        scrollSpyDelay={100}
                        scrollSpyOnce={true}
                    >
                        {({ countUpRef }) => (
                            <div className='text-3xl font-bold my-5 btn h-auto px-6 py-2 btn-active'>
                                <span ref={countUpRef} />
                            </div>
                        )}
                    </CountUp>
                </div>
                {/* <p className='text-center bg-red-300'>Click the button to listen on Spotiwhy app.</p> */}
                <div className="card-actions justify-end">
                    <a href="">
                        <button className="btn btn-primary"  >Discover</button>
                    </a>
                </div>
            </div>
        </div>
    );
};

export default MoviesWatchtime;