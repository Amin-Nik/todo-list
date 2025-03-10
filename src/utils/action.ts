"use server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GetUser() {
  try {
    const user = await prisma.user.findFirst();

    return user;
  } catch (error) {
    console.log(error);
  }
}

export async function PostUser() {
  try {
    const user = await prisma.user.create({
      data: {
        name: "amin",
        email: "amiin026.10@gmail.com",
        password: "123",
        labels: ["one", "two", "three", "four"],
      },
    });

    return user;
  } catch (error) {
    console.log(error);
  }
}

export async function GetTask() {
  try {
    const task = await prisma.task.findMany();

    return task;
  } catch (error) {
    console.log(error);
  }
}

export async function PostTask(date: Date) {
  try {
    const task = await prisma.task.createMany({
      data: [
        {
          date: date,
          description: "aaaaaaaaaaaaa",
          isComplete: false,
          isImportant: false,
          title: "TEST",
          userId: "67c9dcc075cddd2f8bc99e69",
          labels: ["tst"],
        },
        // {
        //   date: "Apr 4, 2025",
        //   description: "this is a test description number 2",
        //   isComplete: true,
        //   isImportant: false,
        //   title: "a test task number 2",
        //   userId: "67c9dcc075cddd2f8bc99e69",
        //   labels: ["two"],
        // },
        // {
        //   date: "Mar 20, 2025",
        //   description: "should make this project done by new year",
        //   isComplete: false,
        //   isImportant: true,
        //   title: "coding",
        //   userId: "67c9dcc075cddd2f8bc99e69",
        //   labels: ["two"],
        // },
        // {
        //   date: "Feb 23, 2025",
        //   description: "arkgksdfbjldfblbjsgbl",
        //   isComplete: true,
        //   isImportant: true,
        //   title: "biushaodfhg",
        //   userId: "67c9dcc075cddd2f8bc99e69",
        //   labels: ["four"],
        // },
        // {
        //   date: "Mar 13, 2025",
        //   description: "this is a test description",
        //   isComplete: false,
        //   isImportant: false,
        //   title: "a test task",
        //   userId: "67c9dcc075cddd2f8bc99e69",
        //   labels: ["three", "three"],
        // },
        // {
        //   date: "Apr 4, 2025",
        //   description: "this is a test description number 2",
        //   isComplete: true,
        //   isImportant: false,
        //   title: "a test task number 2",
        //   userId: "67c9dcc075cddd2f8bc99e69",
        // },
        // {
        //   date: "Mar 20, 2025",
        //   description: "should make this project done by new year",
        //   isComplete: false,
        //   isImportant: true,
        //   title: "coding",
        //   userId: "67c9dcc075cddd2f8bc99e69",
        // },
        // {
        //   date: "Feb 23, 2025",
        //   description: "arkgksdfbjldfblbjsgbl",
        //   isComplete: true,
        //   isImportant: true,
        //   title: "biushaodfhg",
        //   userId: "67c9dcc075cddd2f8bc99e69",
        //   labels: ["three"],
        // },
      ],
    });

    return task;
  } catch (error) {
    console.log(error);
  }
}
