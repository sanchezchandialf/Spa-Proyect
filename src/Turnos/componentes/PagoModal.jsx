// PagoModal.jsx
import React, { useState } from "react";
import useAxios from "../../api/useAxios";
import toast from 'react-hot-toast';

const PagoModal = ({ turnoId, onClose, onPagoExitoso }) => {
  const axiosInstance = useAxios();
  const [formData, setFormData] = useState({
    numTarjeta: "",
    nombreTitular: "",
    vencimiento: "",
    codSeguridad: "",
    metodoPago: "CREDITO",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axiosInstance.post('/api/pago/procesar', {
        turnoId,
        ...formData
      });

      if (response.status === 200) {
        toast.success("Pago realizado con éxito!");
        onPagoExitoso(); // Llamamos a esta función para notificar al padre
        onClose();
      } else {
        toast.error(response.data.message || "Hubo un problema con el pago.");
      }
    } catch (error) {
      //console.error("Error al procesar el pago:", error);
      //toast.error(error.response?.data?.message || "Error al procesar el pago. Por favor, intente de nuevo.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Información de Pago</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Número de Tarjeta</label>
            <input
              type="text"
              name="numTarjeta"
              value={formData.numTarjeta}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label>Nombre del Titular</label>
            <input
              type="text"
              name="nombreTitular"
              value={formData.nombreTitular}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label>Vencimiento</label>
            <input
              type="text"
              name="vencimiento"
              placeholder="MM/YY"
              value={formData.vencimiento}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label>Código de Seguridad</label>
            <input
              type="text"
              name="codSeguridad"
              value={formData.codSeguridad}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label>Método de Pago</label>
            <select
              name="metodoPago"
              value={formData.metodoPago}
              onChange={handleChange}
            >
              <option value="CREDITO">Crédito</option>
              <option value="DEBITO">Débito</option>
            </select>
          </div>

          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded"
            disabled={loading}
          >
            {loading ? "Procesando..." : "Pagar"}
          </button>
          <button
            type="button"
            className="bg-gray-300 px-4 py-2 rounded ml-2"
            onClick={onClose}
          >
            Cancelar
          </button>
        </form>
      </div>
    </div>
  );
};

export default PagoModal;
