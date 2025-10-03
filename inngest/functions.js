import prisma from "@/lib/prisma";
import { inngest } from "./client";

export const syncUserCreation = inngest.createFunction(
  { id: "sync-user-create" },
  { event: "clerk/user.created" },
  async ({ event }) => {
    const {data} = event
    await prisma.user.create({
        data: {
            id: data.id,
            email:data.email_addresses[0].email_address,
            name:`${data.first_name} ${data.last_name}`,
            image:data.image_url
        }
    })
  },
);


//update data 
export const syncUserUpdation = inngest.createFunction(
    {id: 'sync_user_update'},
    {event: 'clerk/user.updated'},
    async({event}) => {
        const { data } = event;
        await prisma.user.update({
            where: {id: data.id},
             data: {
            id: data.id,
            email:data.email_addresses[0].email_address,
            name:`${data.first_name} ${data.last_name}`,
            image:data.image_url
        }
        })
    }
)

//user delete 

export const syncUserDeletion = inngest.createFunction(
     {id: 'sync_user_delete'},
    {event: 'clerk/user.deleted'},
    async({event}) => {
        const { data } = event;
        await prisma.user.delete({
            where: {id: data.id},
        })
    }
)