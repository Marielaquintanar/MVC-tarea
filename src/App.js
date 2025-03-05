import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import './App.css';

const supabase = createClient(
  "https://hcsmwpkdncukrdgnutjv.supabase.co", // Tu URL de proyecto
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imhjc213cGtkbmN1a3JkZ251dGp2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDA2MDY4MzAsImV4cCI6MjA1NjE4MjgzMH0.ami2Jmhbql7Rdn1fZEh7aPh6EbCCNd6vMrqxUBF7GX8" // Tu clave de API
);

function App() {
  const [form, setForm] = useState({ nombre: '', fecha: '', hora: '', motivo: '' });
  const [doctor, setDoctor] = useState(null);

  useEffect(() => {
    getDoctor();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value
    }));
  };

  const insertData = async () => {
    const { error } = await supabase
      .from('cita2')
      .insert([{ nombre: form.nombre, fecha: form.fecha, hora: form.hora, motivo: form.motivo }]);

    if (error) {
      console.error('Error inserting data:', error);
    } else {
      console.log('Data inserted successfully!');
    }
    setForm({
      nombre: '',
      fecha: '',
      hora: '',
      motivo: ''
    });
  };
  async function getDoctor() {
    const { data, error } = await supabase
      .from("doctor")
      .select("*") 
      .eq("id", 3);
  
    console.log("Datos del doctor:", data);
    console.log("Error:", error);
  
    if (error) {
      console.error('Error fetching doctor:', error);
    } else if (data.length > 0) {
      console.log("Doctor encontrado");
      setDoctor(data[0]);
    }
  }

  return (
    <>
    <h1 className="page-title">¡Bienvenido!</h1>
      <div className="main-contenedor">
        <div id="forms">
          <div className="container">
            <div className="title">
              <img id="logo" src= {`./imgs/logo2.png`}></img>
              <h1>Agendar cita</h1>
            </div>
            <p>Nombre: <input className="input-forms" type="text" name="nombre" value={form.nombre} onChange={handleChange} /></p>
            <p>Fecha: <input className="input-forms" type="date" name="fecha" value={form.fecha} onChange={handleChange} /></p>
            <p>Hora: <input className="input-forms" type="time" name="hora" value={form.hora} onChange={handleChange} /></p>
            <p>Motivo de consulta: <input className="input-forms" type="text" name="motivo" value={form.motivo} onChange={handleChange} /></p>
            <button className="button-registro" onClick={insertData}>Registrar Cita</button>
          </div>
        </div>
        <div className="doctor-info">
          {doctor && (
            <>
              <img src = {`./imgs/${doctor.imagen}`}></img>
              <p id="doctor-nombre">{doctor.nombre}</p>
              <p id="doctor-puesto">{doctor.puesto}</p>
              <p id="horario">Horario disponibles</p>
              <p id="h">{doctor.horario}</p>
            </>
          )}
        </div>

      </div>
    </>
  );
}

export default App;
