import { RequestHandler } from "express";
import historyServices from "../services/history.services";

const getOneHistoryChat: RequestHandler = async (req, res) => {
  const { user_id, chat_id } = req.params;
  const historyChat = await historyServices.getOneHistoryChat({ user_id: parseInt(user_id), chat_id: parseInt(chat_id) });

  res.json(historyChat);
}

const getAllHistoryChat: RequestHandler = async (req, res) => {
    const { id } = req.params;
    const historyChat = await historyServices.getAllHistoryChat({ id: parseInt(id) });
    
    res.json(historyChat);
}

export default {
  getOneHistoryChat,
  getAllHistoryChat
}