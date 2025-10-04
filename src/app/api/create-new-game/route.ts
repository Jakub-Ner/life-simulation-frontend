import { type NextRequest, NextResponse } from 'next/server';

const mockGameState = {
  id: 'a158df2e-dd14-4f81-986c-733a954f6c8c',
  parameters: {
    career: 20,
    relations: 20,
    health: 100,
    money: 20,
  },
  history: [],
  turn_description: 'Jesteś 15 letnim mężczyzną. Twoim obecnym ce',
  current_stage: 1,
  game_turn: 0,
  gender: 'male',
  name: 'jan',
  goal: 'wygrać życie',
  big_actions: [
    {
      name: 'Dziecko',
      description: '',
      image_url: 'https://i.imgflip.com/61gawy.jpg',
      parameter_change: {
        career: -10,
        relations: 30,
        health: -10,
        money: -10,
      },
      allowed_stages: [1, 2, 3],
      type: 'relations',
      time_cost: 5,
      is_unique: false,
    },
    {
      name: 'Otwarcie biznesu',
      description: '',
      image_url: 'https://i.imgflip.com/61gawy.jpg',
      parameter_change: {
        career: 15,
        relations: 5,
        health: -20,
        money: 10,
      },
      allowed_stages: [1, 2, 3],
      type: 'money',
      time_cost: 4,
      is_unique: false,
    },
    {
      name: 'Studia',
      description: '',
      image_url: 'https://i.imgflip.com/61gawy.jpg',
      parameter_change: {
        career: 40,
        relations: 30,
        health: 0,
        money: -20,
      },
      allowed_stages: [1, 2, 3],
      type: 'career',
      time_cost: 5,
      is_unique: true,
    },
  ],
  small_actions: [
    {
      name: 'Kursy i szkolenia stacjonarnie',
      description: '',
      image_url: 'https://i.imgflip.com/61gawy.jpg',
      parameter_change: {
        career: 15,
        relations: 10,
        health: 0,
        money: -15,
      },
      allowed_stages: [1, 2, 3],
      type: 'career',
      time_cost: 2,
      is_unique: false,
    },
    {
      name: 'Profilaktyka medyczna',
      description: '',
      image_url: 'https://i.imgflip.com/61gawy.jpg',
      parameter_change: {
        career: 0,
        relations: 0,
        health: 5,
        money: -5,
      },
      allowed_stages: [1, 2, 3],
      type: 'health',
      time_cost: 1,
      is_unique: false,
    },
    {
      name: 'Picie alkoholu/używki',
      description: '',
      image_url: 'https://i.imgflip.com/61gawy.jpg',
      parameter_change: {
        career: 0,
        relations: 10,
        health: -5,
        money: -5,
      },
      allowed_stages: [1, 2, 3],
      type: 'relations',
      time_cost: 1,
      is_unique: false,
    },
    {
      name: 'Kursy i szkolenia online',
      description: '',
      image_url: 'https://i.imgflip.com/61gawy.jpg',
      parameter_change: {
        career: 10,
        relations: 0,
        health: 0,
        money: -10,
      },
      allowed_stages: [1, 2, 3],
      type: 'career',
      time_cost: 1,
      is_unique: false,
    },
    {
      name: 'Zdrowe odżywianie ',
      description: '',
      image_url: 'https://i.imgflip.com/61gawy.jpg',
      parameter_change: {
        career: 0,
        relations: 0,
        health: 10,
        money: -10,
      },
      allowed_stages: [1, 2, 3],
      type: 'health',
      time_cost: 2,
      is_unique: false,
    },
  ],
  random_event: {
    name: '',
    description: '',
    reactions: [],
  },
  age: 15,
};

export async function POST(request: NextRequest) {
  return NextResponse.json(mockGameState);
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
