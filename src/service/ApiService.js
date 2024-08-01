/* eslint-disable no-return-await */
/* eslint-disable lines-between-class-members */
/* eslint-disable class-methods-use-this */
/* eslint-disable import/no-extraneous-dependencies */
import axios from "axios"

class ApiService {
  get = async(baseUrl, endpoint, header) => await axios.get(`${baseUrl}/${endpoint}`, header)
  getByid = async(baseUrl, endpoint, header, id) => await axios.get(`${baseUrl}/${endpoint}/${id}`, header)
  post = async(baseUrl, endpoint, header, data) => await axios.post(`${baseUrl}/${endpoint}`, data, header)
  put = async(baseUrl, endpoint, header, data, id) => await axios.put(`${baseUrl}/${endpoint}/${id}`, data, header)
  delete = async(baseUrl, endpoint, header, id) => await axios.delete(`${baseUrl}/${endpoint}/${id}`, header)
}

export {ApiService}