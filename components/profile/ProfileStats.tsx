import { BarChart3, Target, Clock, Award, ArrowLeft } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';



interface ProfileStatsProps {
  submissions: { status: string }[];
  solvedCount: number;
  playlistCount: number;
}

const ProfileStats = ({ submissions, solvedCount, playlistCount }: ProfileStatsProps) => {
  const acceptedSubmissions = submissions.filter(s => s.status === 'Accepted').length;
  const wrongAnswers = submissions.filter(s => s.status === 'Wrong Answer').length;
  const successRate = submissions.length > 0 ? Math.round((acceptedSubmissions / submissions.length) * 100) : 0;

  const stats = [
    {
      icon: Target,
      label: 'Success Rate',
      value: `${successRate}%`,
      iconColor: 'text-emerald-600 dark:text-emerald-400',
      bgColor: 'bg-emerald-100/50 dark:bg-emerald-900/20',
      borderColor: 'group-hover:border-emerald-200 dark:group-hover:border-emerald-800'
    },
    {
      icon: BarChart3,
      label: 'Total Submissions',
      value: submissions.length.toString(),
      iconColor: 'text-blue-600 dark:text-blue-400',
      bgColor: 'bg-blue-100/50 dark:bg-blue-900/20',
      borderColor: 'group-hover:border-blue-200 dark:group-hover:border-blue-800'
    },
    {
      icon: Award,
      label: 'Problems Solved',
      value: solvedCount.toString(),
      iconColor: 'text-purple-600 dark:text-purple-400',
      bgColor: 'bg-purple-100/50 dark:bg-purple-900/20',
      borderColor: 'group-hover:border-purple-200 dark:group-hover:border-purple-800'
    },
    {
      icon: Clock,
      label: 'Playlists Created',
      value: playlistCount.toString(),
      iconColor: 'text-amber-600 dark:text-amber-400',
      bgColor: 'bg-amber-100/50 dark:bg-amber-900/20',
      borderColor: 'group-hover:border-amber-200 dark:group-hover:border-amber-800'
    }
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {stats.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <Card
            key={index}
            className={`group relative overflow-hidden border border-border/60 bg-background hover:shadow-md transition-all duration-300 hover:-translate-y-1 hover:scale-[1.01] ${stat.borderColor}`}
          >
            <div className={`absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity duration-300`}>
               <Icon className={`w-24 h-24 ${stat.iconColor} -mr-4 -mt-4 transform rotate-12`} />
            </div>
            
            <CardContent className="p-6">
              <div className="flex flex-col space-y-4">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${stat.bgColor} transition-colors duration-300 group-hover:scale-110 transform`}>
                  <Icon className={`w-6 h-6 ${stat.iconColor}`} />
                </div>
                <div className="space-y-1 z-10">
                  <h3 className="text-2xl font-bold tracking-tight text-foreground">{stat.value}</h3>
                  <p className="text-sm font-medium text-muted-foreground">{stat.label}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

export default ProfileStats;