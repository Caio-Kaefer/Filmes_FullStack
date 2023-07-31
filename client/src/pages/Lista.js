import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import axios from 'axios';
import Navbar from '../components/Navbar';

function Lista() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:5000/all');
      setData(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const Delete = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:5000/remover/${id}`);
      console.log(response.data);
      if (response.status === 200) {
        alert('Filme removido com sucesso');
        window.location.reload();
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Navbar />
      <div className="card-grid">
        {data.map((item) => (
          <div key={item.Id} className="card" style={{ width: 250, margin: 20 }}>
            <div className="card-body">
              <h5 className="card-title">{item.Nome}</h5>
              <p className="card-text">{item.Diretor}</p>
              <p className="card-text">{item.AnoLancamento}</p>
              <button className="btn btn-danger" onClick={() => Delete(item.Id)}>
                Deletar
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default Lista;
