import { NavLink, useNavigate } from "react-router-dom"

export const NavBar = ({isLoggedIn, setIsLoggedIn}) => {
    const navigate =useNavigate()
    const handleLogOut = () =>{
        setIsLoggedIn(false)
        navigate('/', {replace:true})
    }

  return (
<>
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
  <div className="container-fluid">
    <NavLink className="navbar-brand" href="#">Portafolio</NavLink>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
      <div className="navbar-nav">
        <NavLink to='/mainscreen'className="nav-link" >Mainscreen</NavLink>
        <NavLink to='/aboutscreen'className="nav-link" >Contact</NavLink>
        <NavLink to='/devcodessection'className="nav-link" >DevSection</NavLink>
      </div>
        {isLoggedIn &&(<button className="btn btn-outline-danger" onClick={handleLogOut}>Cerrar Sesion</button>)}
    </div>
  </div>
</nav>
</>
  )
}

