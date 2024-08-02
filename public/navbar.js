function NavBar(){
    return(
      <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <a className="navbar-brand" href="#">BadBank</a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <a className="nav-link" title="Create a New Account" href="#/CreateAccount/">Create Account</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" title="Login to Existing Account" href="#/login/">Login</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" title="Deposit Funds to Account" href="#/deposit/">Deposit</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" title="Withdraw Funds from Account" href="#/withdraw/">Withdraw</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" title="Check your Existing Balance" href="#/balance/">Balance</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" title="Check all data" href="#/alldata/">AllData</a>
            </li>          
          </ul>
        </div>
      </nav>
      </>
    );
  }