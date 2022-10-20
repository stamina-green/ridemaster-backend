import Enquiry from "./Enquiry";
import User from "./User";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default class Order {
  id: number;
  user: User;
  enquiry: Enquiry;
  status: string;
  constructor(id: number, user: User, enquiry: Enquiry, status: string) {
    this.id = id;
    this.user = user;
    this.enquiry = enquiry;
    this.status = status;
  }
  public static async fromId(id: number) {
    const result = await prisma.order.findUnique({
      where: {
        id: id,
      },
    });
    if (!result) throw Error("Order not found");
    const user = await User.fromId(result.userId);
    const enquiry = await Enquiry.fromId(result.enquiryId);
    return new Order(result.id, user, enquiry, result.status);
  }
  public static async acceptEnquiry(id: number, user: User) {
    const enquiry = await Enquiry.fromId(id);
    const result = await prisma.order.create({
      data: {
        userId: user.id,
        enquiryId: enquiry.id,
        status: "accepted",
      },
    });
    return new Order(result.id, user, enquiry, result.status);
  }
}
