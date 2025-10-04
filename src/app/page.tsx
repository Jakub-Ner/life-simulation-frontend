import AvatarsContainer from '~/components/avatars/AvatarsContainer';

export default function HomePage() {
  return (
    <main className='relative flex min-h-screen overflow-hidden'>
      huj
      <AvatarsContainer
        age='YOUNG'
        gender='male'
        isHappy={false}
        isSick={true}
        isSpouse={false}
        hasChild={true}
      />
    </main>
  );
}
