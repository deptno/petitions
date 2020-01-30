import {scryptSync} from "crypto"

export const const_is_production = process.env.STAGE === 'prd'
export const const_stage = process.env.STAGE!
export const const_cors = process.env.CORS!
export const const_ddb_table = process.env.PTT_DDB_TABLE!
export const const_salt = scryptSync('salt text', 'salt', 24);
