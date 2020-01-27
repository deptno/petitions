import fetch from 'isomorphic-unfetch'
import {const_best_url} from './constant'

export const getBestPetitionsHtml = () => fetch(const_best_url).then(response => response.text())
