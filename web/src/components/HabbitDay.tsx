interface HabbitDayModel {
  disabled?: boolean;
}
export function HabbitDay(props: HabbitDayModel) {
  return (
    <div className={`w-10 h-10 bg-zinc-900 border-2 border-zinc-800 rounded-lg ${props.disabled ? 'opacity-40 cursor-not-allowed' : ''}`}></div>
  )
}