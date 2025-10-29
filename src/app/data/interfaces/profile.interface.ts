export interface Profile {
  id: number,
  username: string,
  avatarUrl: string | null,
  subscribersAmount: number,
  firstName: string,
  lastName: string,
  isActive: boolean,
  stack: string[]
  city: string,
  description: string
}


export type PartialUser = Readonly<Profile>;
// { name?: string; age?: number }


