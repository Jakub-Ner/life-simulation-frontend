import { type NextRequest, NextResponse } from 'next/server';

const mockGameState = {
  id: 'ee28237e-bbe6-419a-abf5-ff3313272baa',
  parameters: {
    career: 20,
    relations: 20,
    health: 100,
    money: 20,
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
  ],
  turn_description: 'Jesteś 15 letnim mężczyzną. Twoim obecnym ce',
  current_stage: 1,
  game_turn: 0,
  gender: 'male',
  name: 'aaa',
  goal: 'Bogata emerytura',
  big_actions: [
    {
      description: 'Podniesienie kompetencji organizacyjnych',
      image_url:
        'https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y291cnNlfGVufDB8fDB8fHww',
      parameter_change: {
        career: 20,
        relations: 15,
        health: 0,
        money: -10,
      },
      name: 'Kurs zarządzania projektami',
      type: 'career',
      time_cost: 4,
      is_unique: true,
      allowed_stages: [1, 2, 3],
      prerequisite_names: [],
    },
    {
      description: 'Wsparcie w zarządzaniu budżetem',
      image_url:
        'https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y291cnNlfGVufDB8fDB8fHww',
      parameter_change: {
        career: 15,
        relations: 20,
        health: 0,
        money: -10,
      },
      name: 'Zatrudnienie doradcy finansowego',
      type: 'money',
      time_cost: 4,
      is_unique: true,
      allowed_stages: [1, 2, 3],
      prerequisite_names: [],
    },
    {
      description: 'Z wielką mocą wiąże się wielka odpowiedialność',
      image_url:
        'https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y291cnNlfGVufDB8fDB8fHww',
      parameter_change: {
        career: 5,
        relations: 30,
        health: -10,
        money: 5,
      },
      name: 'Kandyduj do samorządu',
      type: 'relations',
      time_cost: 5,
      is_unique: false,
      allowed_stages: [1, 2, 3],
      prerequisite_names: [],
    },
  ],
  small_actions: [
    {
      description: 'Budowanie relacji zawodowych na wydarzeniach branżowych',
      image_url:
        'https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y291cnNlfGVufDB8fDB8fHww',
      parameter_change: {
        career: 10,
        relations: -5,
        health: 0,
        money: 0,
      },
      name: 'Spotkania networkingowe',
      type: 'career',
      time_cost: 2,
      is_unique: false,
      allowed_stages: [1, 2, 3],
      prerequisite_names: [],
    },
    {
      description: 'Nauka zarządzania pieniędzmi',
      image_url:
        'https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y291cnNlfGVufDB8fDB8fHww',
      parameter_change: {
        career: 10,
        relations: -5,
        health: 0,
        money: 0,
      },
      name: 'Kurs finansów osobistych',
      type: 'money',
      time_cost: 3,
      is_unique: false,
      allowed_stages: [1, 2, 3],
      prerequisite_names: [],
    },
    {
      description: 'Poprawa zdrowia i jakości snu',
      image_url:
        'https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y291cnNlfGVufDB8fDB8fHww',
      parameter_change: {
        career: 0,
        relations: 10,
        health: -5,
        money: 0,
      },
      name: 'Ograniczenie alkoholu',
      type: 'health',
      time_cost: 2,
      is_unique: false,
      allowed_stages: [1, 2, 3],
      prerequisite_names: [],
    },
    {
      description: 'Regularne ćwiczenia poprawiające kondycję i samopoczucie',
      image_url:
        'https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y291cnNlfGVufDB8fDB8fHww',
      parameter_change: {
        career: 0,
        relations: 10,
        health: 10,
        money: -5,
      },
      name: 'Trening siłowy',
      type: 'health',
      time_cost: 2,
      is_unique: false,
      allowed_stages: [1, 2, 3],
      prerequisite_names: [],
    },
    {
      description: 'Poprawa elastyczności i redukcja stresu',
      image_url:
        'https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y291cnNlfGVufDB8fDB8fHww',
      parameter_change: {
        career: 0,
        relations: -5,
        health: 10,
        money: 0,
      },
      name: 'Zajęcia z jogi',
      type: 'health',
      time_cost: 1,
      is_unique: false,
      allowed_stages: [1, 2, 3],
      prerequisite_names: [],
    },
  ],
  random_event: {
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
  stage_summary: null,
  is_game_finished: false,
  did_user_win: true,
  age: 15,
};

export async function POST(request: NextRequest) {
  // return new Promise((resolve) => {
  //   setTimeout(() => {
  //     resolve(NextResponse.json(mockGameState));
  //   }, 1000);
  // });

  try {
    const body = await request.json();

    const response = await fetch(`${process.env.BACKEND_URL}/create-new-game`, {
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
    console.log('Creating new game with data:', JSON.stringify(data, null, 2));
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error creating new game:', error);
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
