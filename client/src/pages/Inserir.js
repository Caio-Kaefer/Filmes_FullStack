import React, {useState, useEffect} from 'react'
import axios from 'axios';
import Navbar from '../components/Navbar';

function Inserir() {
    const [dadosFormulario, setDadosFormulario] = useState({
        Nome: '',
        Diretor:'',
        AnoLancamento: ''

      });
    
      const handleChange = (event) => {
        setDadosFormulario({
          ...dadosFormulario,
          [event.target.name]: event.target.value
        });
      };
    
      const handleSubmit = async (event) => {
        event.preventDefault();
        setDadosFormulario({
          ...dadosFormulario,
          Nome: '',
          Diretor: '',
          AnoLancamento: '',
        });
        
        // window.location.reload();
        
    
        try {
          const response = await axios.post('http://localhost:5000/include', dadosFormulario);
          console.log(response.data); // Tratar a resposta da API como desejado
          if(response.status == 200){
            alert('informações adicionadas com sucesso');
            window.location.reload();
          }
        } catch (error) {
          console.error(error);
        }
      };
    
      return (
        <>
        <Navbar/>
        <form id="postForm" className="form-group row" onSubmit={handleSubmit}>
          <h2>Inserir Dados</h2>
          <div>
            <label>Nome do Filme</label>
            <input
              type="Text"
              name="Nome"
              className="form-control"
              value={dadosFormulario.Nome}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>Diretor</label>
            <input
              type="text"
              name="Diretor"
              className="form-control"
              value={dadosFormulario.Diretor}
              onChange={handleChange}
            />
          </div>
          <div >
            <label>Ano de Lançamento</label>
            <input
              type="number"
              name="AnoLancamento"
              className="form-control"
              value={dadosFormulario.AnoLancamento}
              onChange={handleChange}
            />
         </div>
          <div>
            <button 
            type="submit"
            className="btn btn-primary mt-5"
            >
              Enviar
            </button>
          </div>
        </form>
        </>
      );
}

export default Inserir