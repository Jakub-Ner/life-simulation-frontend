import { type NextRequest, NextResponse } from 'next/server';

const gameOverMockData = {
  id: '9f0b8dac-aeb8-4098-8438-ef75ce41fd39',
  parameters: {
    career: 65,
    relations: 40,
    health: 90,
    money: 36,
  },
  history: [
    {
      name: 'Awans w pracy',
      description: 'Dostajesz propozycję objęcia kierowniczego stanowiska.',
      reactions: [
        {
          description: 'Przyjmuję awans, mimo stresu',
          image_url:
            'https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y291cnNlfGVufDB8fDB8fHww',
          parameter_change: {
            career: 15,
            relations: -5,
            health: -5,
            money: 10,
          },
          id: 17,
          result: 'Zyskujesz pozycję i pieniądze, ale cierpi równowaga życiowa',
        },
        {
          description: 'Odrzucam awans dla spokoju',
          image_url:
            'https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y291cnNlfGVufDB8fDB8fHww',
          parameter_change: {
            career: -5,
            relations: 10,
            health: 0,
            money: -5,
          },
          id: 18,
          result: 'Masz mniej stresu, ale tracisz szansę na rozwój',
        },
      ],
    },
    {
      description: 'Odrzucam awans dla spokoju',
      image_url:
        'https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y291cnNlfGVufDB8fDB8fHww',
      parameter_change: {
        career: -5,
        relations: 10,
        health: 0,
        money: -5,
      },
      id: 18,
      result: 'Masz mniej stresu, ale tracisz szansę na rozwój',
    },
    {
      description: 'Nowy etap w życiu zawodowym i wyższe zarobki',
      image_url:
        'https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y291cnNlfGVufDB8fDB8fHww',
      parameter_change: {
        career: 25,
        relations: 20,
        health: -10,
        money: 15,
      },
      name: 'Zmiana miejsca pracy',
      type: 'career',
      time_cost: 5,
      is_unique: true,
      allowed_stages: [1, 2, 3],
      prerequisite_names: [],
    },
    {
      description: 'Analiza celów zawodowych i kierunku rozwoju',
      image_url:
        'https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y291cnNlfGVufDB8fDB8fHww',
      parameter_change: {
        career: 15,
        relations: -5,
        health: 0,
        money: 0,
      },
      name: 'Planowanie kariery zawodowej',
      type: 'career',
      time_cost: 3,
      is_unique: true,
      allowed_stages: [1, 2, 3],
      prerequisite_names: [],
    },
    {
      description: 'Udział w kursie poprawiającym kompetencje i pewność siebie',
      image_url:
        'https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y291cnNlfGVufDB8fDB8fHww',
      parameter_change: {
        career: 10,
        relations: -5,
        health: 0,
        money: 0,
      },
      name: 'Kurs rozwoju osobistego',
      type: 'career',
      time_cost: 2,
      is_unique: false,
      allowed_stages: [1, 2, 3],
      prerequisite_names: [],
    },
    {
      name: 'Narodziny dziecka',
      description: 'Twoje życie właśnie się zmienia — na zawsze.',
      reactions: [
        {
          description:
            'Biorę więcej obowiązków, chcę zapewnić rodzinie bezpieczeństwo',
          image_url:
            'https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y291cnNlfGVufDB8fDB8fHww',
          parameter_change: {
            career: 10,
            relations: 10,
            health: -5,
            money: -10,
          },
          id: 19,
          result: 'Więcej pracy i stresu, ale rodzina ma lepsze warunki',
        },
        {
          description: 'Skupiam się na rodzinie, ograniczam karierę',
          image_url:
            'https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y291cnNlfGVufDB8fDB8fHww',
          parameter_change: {
            career: -10,
            relations: 15,
            health: 5,
            money: -5,
          },
          id: 20,
          result: 'Zyskujesz bliskość i satysfakcję kosztem kariery',
        },
      ],
    },
  ],
  turn_description: 'Jesteś 15 letnim mężczyzną. Twoim obecnym ce',
  current_stage: 1,
  game_turn: 1,
  gender: 'male',
  name: 'Zod',
  goal: 'Bogata emerytura',
  big_actions: [
    {
      description: 'Początek świadomego inwestowania',
      image_url:
        'https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y291cnNlfGVufDB8fDB8fHww',
      parameter_change: {
        career: 15,
        relations: 20,
        health: 0,
        money: -10,
      },
      name: 'Założenie konta inwestycyjnego',
      type: 'money',
      time_cost: 4,
      is_unique: true,
      allowed_stages: [1, 2, 3],
      prerequisite_names: [],
    },
    {
      description: 'Ułatwienie pracy i zwiększenie produktywności',
      image_url:
        'https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y291cnNlfGVufDB8fDB8fHww',
      parameter_change: {
        career: 20,
        relations: 25,
        health: -10,
        money: -10,
      },
      name: 'Zatrudnienie asystenta',
      type: 'career',
      time_cost: 4,
      is_unique: true,
      allowed_stages: [1, 2, 3],
      prerequisite_names: [],
    },
    {
      description: 'Nowe umiejętności w branży kreatywnej',
      image_url:
        'https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y291cnNlfGVufDB8fDB8fHww',
      parameter_change: {
        career: 25,
        relations: 25,
        health: 0,
        money: -10,
      },
      name: 'Kurs grafiki komputerowej',
      type: 'career',
      time_cost: 4,
      is_unique: true,
      allowed_stages: [1, 2, 3],
      prerequisite_names: [],
    },
  ],
  small_actions: [
    {
      description: 'Inwestowanie w rozwój umiejętności',
      image_url:
        'https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y291cnNlfGVufDB8fDB8fHww',
      parameter_change: {
        career: 20,
        relations: 15,
        health: 0,
        money: -10,
      },
      name: 'Inwestycje edukacyjne',
      type: 'career',
      time_cost: 3,
      is_unique: true,
      allowed_stages: [1, 2, 3],
      prerequisite_names: [],
    },
    {
      description: 'Udział w kursie poprawiającym kompetencje i pewność siebie',
      image_url:
        'https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y291cnNlfGVufDB8fDB8fHww',
      parameter_change: {
        career: 10,
        relations: -5,
        health: 0,
        money: 0,
      },
      name: 'Kurs rozwoju osobistego',
      type: 'career',
      time_cost: 2,
      is_unique: false,
      allowed_stages: [1, 2, 3],
      prerequisite_names: [],
    },
    {
      description: 'Rozwój umiejętności pracy z technologią',
      image_url:
        'https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y291cnNlfGVufDB8fDB8fHww',
      parameter_change: {
        career: 15,
        relations: 20,
        health: 0,
        money: -10,
      },
      name: 'Zwiększenie kompetencji cyfrowych',
      type: 'career',
      time_cost: 3,
      is_unique: true,
      allowed_stages: [1, 2, 3],
      prerequisite_names: [],
    },
    {
      description: 'Świadome decyzje poprawiające zdrowie i planetę',
      image_url:
        'https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y291cnNlfGVufDB8fDB8fHww',
      parameter_change: {
        career: 15,
        relations: 20,
        health: -5,
        money: -10,
      },
      name: 'Zmiana stylu życia na bardziej ekologiczny',
      type: 'health',
      time_cost: 3,
      is_unique: false,
      allowed_stages: [1, 2, 3],
      prerequisite_names: [],
    },
    {
      description: 'Spędzenie wspólnego czasu z rodziną',
      image_url:
        'https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y291cnNlfGVufDB8fDB8fHww',
      parameter_change: {
        career: 0,
        relations: 20,
        health: -5,
        money: -10,
      },
      name: 'Rodzinny wyjazd',
      type: 'relations',
      time_cost: 2,
      is_unique: false,
      allowed_stages: [1, 2, 3],
      prerequisite_names: [],
    },
  ],
  random_event: {
    name: 'Narodziny dziecka',
    description: 'Twoje życie właśnie się zmienia — na zawsze.',
    reactions: [
      {
        description:
          'Biorę więcej obowiązków, chcę zapewnić rodzinie bezpieczeństwo',
        image_url:
          'https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y291cnNlfGVufDB8fDB8fHww',
        parameter_change: {
          career: 10,
          relations: 10,
          health: -5,
          money: -10,
        },
        id: 19,
        result: 'Więcej pracy i stresu, ale rodzina ma lepsze warunki',
      },
      {
        description: 'Skupiam się na rodzinie, ograniczam karierę',
        image_url:
          'https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y291cnNlfGVufDB8fDB8fHww',
        parameter_change: {
          career: -10,
          relations: 15,
          health: 5,
          money: -5,
        },
        id: 20,
        result: 'Zyskujesz bliskość i satysfakcję kosztem kariery',
      },
    ],
  },
  stage_summary: null,
  is_game_finished: false,
  did_user_win: true,
  age: 20,
};

export async function POST(request: NextRequest) {
  // return new Promise((resolve) => {
  //   setTimeout(() => {
  //     resolve(NextResponse.json(gameOverMockData));
  //   }, 3000);
  // });

  try {
    const body = await request.json();

    const response = await fetch(`${process.env.BACKEND_URL}/next-turn`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        X_API_KEY: `${process.env.X_API_KEY}`,
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      const errorText = await response.text();
      return NextResponse.json(
        { error: `Backend error: ${errorText}` },
        { status: response.status },
      );
    }

    const data = await response.json();
    console.log('Next turn data:', JSON.stringify(data, null, 2));
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error advancing to next turn:', error);
    return NextResponse.json(
      {
        error:
          error instanceof Error ? error.message : 'Unknown error occurred',
      },
      { status: 500 },
    );
  }
}

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  });
}
