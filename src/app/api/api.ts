import {config} from '../config/config';

export const prefix = `${config.getApiPrefix()}/test`;
export const API = {
  translate: prefix + '/word/trans',
  similar: prefix + '/word/similar',
  info: prefix + '/word/info'
};
