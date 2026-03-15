import express, { Request, Response } from "express";
import { pool } from "../database";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { RowDataPacket, ResultSetHeader } from "mysql2";

const router = express.Router();

interface User extends RowDataPacket {
  id: number;
  email: string;
  password_hash: string;
  created_at: string;
}

router.post("/register", async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        error: "Email and password are required",
      });

    }
    const [existingUsers] = await pool.execute<User[]>(
      "SELECT * FROM users WHERE email = ?",
      [email]
    );

    if (existingUsers.length > 0) {
      return res.status(409).json({
        error: "Email already exists",
      });
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const [result] = await pool.execute<ResultSetHeader>(
      "INSERT INTO users (email, password_hash) VALUES (?, ?)",
      [email, passwordHash]  );

    res.status(201).json({
      id: result.insertId,
      email,
    }
  );
  } catch (error) {
    console.error("Register error:", error);
    res.status(500).json({
      error: "Failed to register user",
    });
  }
});

router.post("/login", async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        error: "Email and password are required",
      });
    }

    const [users] = await pool.execute<User[]>(
      "SELECT * FROM users WHERE email = ?",
      [email]
    );

    if (users.length === 0) {
      return res.status(401).json({
        error: "Invalid credentials",
      });
    }

    const user = users[0];
    const passwordMatches = await bcrypt.compare(password, user.password_hash);

    if (!passwordMatches) {
      return res.status(401).json({
        error: "Invalid credentials",
      });}

    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET as string,
      { expiresIn: "1h" }
    );

    res.json({ token });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({
      error: "Failed to login",
    });}});

export default router;