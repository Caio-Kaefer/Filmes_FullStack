import React from 'react'
import { Link } from 'react-router-dom'

function Navbar() {
    return (
        <>
            <nav class="navbar navbar-expand-lg navbar-light bg-light">
                <Link class="navbar-brand" to={"/"}>Filme_FullStack</Link>
                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarNav">
                    <ul class="navbar-nav">
                        <li class="nav-item active">
                            <Link class="nav-link" to={"/"}>Home <span class="sr-only"></span></Link>
                        </li>
                        <li class="nav-item active">
                            <Link class="nav-link" to={"/Lista"}>Lista de filmes <span class="sr-only"></span></Link>
                        </li>
                        <li class="nav-item active">
                            <Link class="nav-link" to={"/InserirFilme"}>Inserir Filme<span class="sr-only"></span></Link>
                        </li>
                    </ul>
                </div>
            </nav>
        </>
    )
}

export default Navbar