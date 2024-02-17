
const Login = () => {
  return (
    <div className="flex flex-col items-center justify-center min-w-96 mx-auto">
      <div className="w-full p-6 rounded-lg shadow-md bg-orange-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-15">
        <h1 className="text-3xl font-semibold text-center text-black">
          Login
          <span className="text-red-900"> ChatApp </span>
        </h1>
        <form>
          <div>
            <label className="label p-2">
              <span className="text-base label-text">Username</span>
            </label>
            <input
              type="text"
              placeholder="Enter username"
              className="w-full input input-bordered h-10"
            ></input>
          </div>
          <div>
            <label className="label">
              <span className="text-base label-text">Password</span>
            </label>
            <input type="password" placeholder='password' className="w-full input input-bordered h-10"/>
          </div>
          <div>
            <button className="btn btn-block btn-sm mt-2 bg-orange-600">Login</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login
