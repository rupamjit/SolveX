import NavBar from '@/components/home/NavBar';
import { getCurrentUserRole } from '@/modules/auth/actions/auth'


const layout = async ({children}:{children:React.ReactNode}) => {
    const userRole = await getCurrentUserRole();
  return (
   <main className='flex min-h-screen flex-col max-w-8xl mx-auto'>
    <NavBar userRole={userRole}/>
    <div className='flex flex-1 flex-col px-4 pb-4'>
        {children}
    </div>
    
   </main>
  )
}

export default layout