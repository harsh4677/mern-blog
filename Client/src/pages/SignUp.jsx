import * as React from 'react';

function Signup({ setAuthState }) {
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [confirmPassword, setConfirmPassword] = React.useState('');

    const handleSignup = () => {
        // Add signup logic here if needed
        console.log('Signup clicked');
    };

    return (
        <div className="flex w-full h-screen">
            <div className="w-full flex items-center justify-center lg:w-1/2">
                <div className='w-11/12 max-w-[700px] px-10 py-20 rounded-3xl bg-white border-2 border-gray-100'>
                    <h1 className='text-5xl font-semibold'>Create an Account</h1>
                    <p className='font-medium text-lg text-gray-500 mt-4'>Sign up to get started.</p>
                    <div className='mt-8'>
                        <div className='flex flex-col'>
                            <label className='text-lg font-medium'>Email</label>
                            <input 
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className='w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent'
                                placeholder="Email"
                            />
                        </div>
                        <div className='flex flex-col mt-4'>
                            <label className='text-lg font-medium'>Password</label>
                            <input 
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className='w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent'
                                placeholder="Password"
                                type="password"
                            />
                        </div>
                        <div className='flex flex-col mt-4'>
                            <label className='text-lg font-medium'>Confirm Password</label>
                            <input 
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                className='w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent'
                                placeholder="Confirm Password"
                                type="password"
                            />
                        </div>
                        <div className='mt-8 flex flex-col gap-y-4'>
                            <button 
                                onClick={handleSignup}
                                className='active:scale-[.98] active:duration-75 transition-all hover:scale-[1.01] ease-in-out transform py-4 bg-violet-500 rounded-xl text-white font-bold text-lg'>
                                Sign Up
                            </button>
                        </div>
                        <div className='mt-8 flex justify-center items-center'>
                            <p className='font-medium text-base'>Already have an account?</p>
                            <button 
                                onClick={() => setAuthState('login')}
                                className='ml-2 font-medium text-base text-violet-500'>
                                Log In
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="hidden relative w-1/2 h-full lg:flex items-center justify-center bg-gray-200">
                <div className="relative flex items-center justify-center w-60 h-60 rounded-full bg-gradient-to-tr from-violet-500 to-pink-500 animate-bounce">
                    <span className="text-white text-9xl font-bold">B</span>
                </div>
                <div className="w-full h-1/2 absolute bottom-0 bg-white/10 backdrop-blur-lg" />
            </div>
        </div>
    );
}

export default Signup;
