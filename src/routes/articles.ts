import express, { Request, Response } from "express";
import { pool } from "../database";
import { authenticateToken } from "../middleware/authMiddleware";
import { ResultSetHeader, RowDataPacket } from "mysql2";
import { JwtPayload } from "jsonwebtoken";

const router = express.Router();

// Interface for article
interface Article extends RowDataPacket {
  id: number;
  title: string;
  body: string;
  category: string;
  submitted_by: number;
  created_at: string;
  submitted_by_email?: string;
}

interface AuthUser extends JwtPayload {
  id: number;
  email: string;
}

router.get("/", async (req: Request, res: Response) => {
  try {
    const [rows] = await pool.execute<Article[]>(
      `SELECT
        articles.id,
        articles.title,
        articles.body,
        articles.category,
        articles.created_at,
        articles.submitted_by,
        users.email AS submitted_by_email
       FROM articles
       JOIN users ON articles.submitted_by = users.id
       ORDER BY articles.created_at DESC`
    );

    res.json(rows);
  } catch (error) {
    console.error("Fetch articles error:", error);
    res.status(500).json({
      error: "Failed to fetch articles",
    });
  }
});

router.post("/", authenticateToken, async (req: Request, res: Response) => {
  try {
    const { title, body, category } = req.body;

    if (!title || !body || !category) {
      return res.status(400).json({
        error: "Title, body and category are required",
      });
    }

    const user = req.user as AuthUser;

    const [result] = await pool.execute<ResultSetHeader>(
      "INSERT INTO articles (title, body, category, submitted_by) VALUES (?, ?, ?, ?)",
      [title, body, category, user.id]
    );

    const [rows] = await pool.execute<Article[]>(
      `SELECT
        articles.id,
        articles.title,
        articles.body,
        articles.category,
        articles.created_at,
        articles.submitted_by,
        users.email AS submitted_by_email
       FROM articles
       JOIN users ON articles.submitted_by = users.id
       WHERE articles.id = ?`,
      [result.insertId]
    );

    res.status(201).json(rows[0]);
  } catch (error) {
    console.error("Create article error:", error);
    res.status(500).json({
      error: "Failed to create article",
    }
  );
  }
}
);

export default router;