import ProblemsTable from '@/components/problem/ProblemsTable'
import prisma from '@/lib/prisma';
import { getAllProblems } from '@/modules/problems/actions/problem'
import { currentUser } from '@clerk/nextjs/server';
import React from 'react'

const page = async () => {
    const user = await currentUser();
  let dbUser = null;
  
  if (user) {
    dbUser = await prisma.user.findUnique({
      where: { clerkId: user.id },
      select: { id: true, role: true }
    });
  }


    const {data:problems} = await getAllProblems()
    console.log(problems)

  return (
     <div className="container mx-auto py-10">
      <ProblemsTable problems={problems} user={dbUser} />
    </div>
  )
}

export default page