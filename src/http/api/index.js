import fetch from "../axios"

//顶部数据
export const getScreenAddData = (params) => fetch('/api/DataScreen/index', params, "get");

//项目情况
export const getProjectSituation = (params) => fetch('/api/DataScreen/projectSituation', params, "get")

//供应商申请入驻量
export const getSuppliersAdd = (params) => fetch('/api/DataScreen/suppliers_add', params, "get");

//最新交易情况
export const getDealData = (params) => fetch('/api/DataScreen/deal_data', params, "get");