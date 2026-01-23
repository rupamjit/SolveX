import CreateProblemForm from '@/components/problem/CreateProblemForm';
import { Button } from '@/components/ui/button';
import { getCurrentUserRole } from '@/modules/auth/actions/auth';
import { currentUser } from '@clerk/nextjs/server';
import { UserRole } from '@prisma/client';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { redirect } from 'next/navigation';

const CreateProblem = async () => {
    const user = await currentUser();
    const userRole = await getCurrentUserRole();

    if (userRole !== UserRole.ADMIN) {
        redirect("/");
    }

    return (
        <main className="min-h-screen bg-background/50">
            <div className="container mx-auto px-4 py-10 max-w-7xl">
                {/* Header with improved alignment */}
                <div className="flex items-center gap-6 mb-10">
                    <Link href="/">
                        <Button variant="outline" size="icon" className="h-11 w-11 rounded-xl hover:bg-background hover:shadow-md transition-all shadow-xs shrink-0">
                            <ArrowLeft className="h-5 w-5" />
                        </Button>
                    </Link>
                    <div className="space-y-1">
                        <h1 className="text-3xl font-bold tracking-tight text-foreground">
                            Hello, {user?.firstName}
                        </h1>
                        <p className="text-sm text-muted-foreground font-medium flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                            Admin Console 
                        </p>
                    </div>
                </div>

                {/* Form  */}
                <div className="bg-background rounded-[2rem] border shadow-xs">
                    <CreateProblemForm />
                </div>
            </div>
        </main>
    );
};

export default CreateProblem;