import { useAuthState } from '@/contexts/AuthContext';

export default function useTeamId(eventName) {
  const { user } = useAuthState();
  const teamId = user?.team.find((teamElement) =>
    teamElement.event.includes(eventName),
  )?.team_id;
  return teamId;
}
