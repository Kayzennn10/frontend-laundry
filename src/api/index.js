import axios from "axios";

const API_BASE_URL = `http://localhost:8000`;

class API {
  static async login(dataLogin) {
    try {
      const response = await axios.post(`${API_BASE_URL}/login`, dataLogin);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  }

  static async register(dataRegister) {
    try {
      const response = await axios.post(`${API_BASE_URL}/user`, dataRegister);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }

  static async getUser() {
    try {
      const response = await axios.get(`${API_BASE_URL}/user`);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }

  static async getUserById(idUser) {
    try {
      const response = await axios.get(`${API_BASE_URL}/user/${idUser}`);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }

  static async editUser(dataUser, idUser) {
    try {
      const response = await axios.put(
        `${API_BASE_URL}/user/${idUser}`,
        dataUser
      );
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }

  static async deleteUser(idUser) {
    try {
      const response = await axios.delete(`${API_BASE_URL}/user/${idUser}`);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }

  static async service(dataService) {
    try {
      const response = await axios.post(`${API_BASE_URL}/user`, dataService);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }

  static async getService() {
    try {
      const response = await axios.get(`${API_BASE_URL}/user`);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }

  static async getServiceById(idService) {
    try {
      const response = await axios.get(`${API_BASE_URL}/service/${idService}`);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }

  static async editService(dataService, idService) {
    try {
      const response = await axios.put(
        `${API_BASE_URL}/service/${idService}`,
        dataService
      );
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }

  static async deleteService(idService) {
    try {
      const response = await axios.delete(`${API_BASE_URL}/service/${idService}`);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }

  static async payment(dataPayment) {
    try {
      const response = await axios.post(`${API_BASE_URL}/payment`, dataPayment);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }

  static async getPayment() {
    try {
      const response = await axios.get(`${API_BASE_URL}/payment`);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }

  static async getPaymentById(idPayment) {
    try {
      const response = await axios.get(`${API_BASE_URL}/payment/${idPayment}`);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }

  static async editPayment(dataPayment, idPayment) {
    try {
      const response = await axios.put(
        `${API_BASE_URL}/payment/${idPayment}`,
        dataPayment
      );
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }

  static async deletePayment(idPayment) {
    try {
      const response = await axios.delete(`${API_BASE_URL}/payment/${idPayment}`);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
}

export default API;
