
'use server';

import { z } from 'zod';
import { sql } from '@vercel/postgres';
import { unstable_noStore as noStore } from 'next/cache';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

import { signIn } from '@/auth';
import { AuthError } from 'next-auth';

const ITEMS_PER_PAGE = 5;

//---CreateNewsC----------------------------------------------------

const FormSchemaC = z.object({
    id: z.string(),
    date: z.string(),
    title: z.string(),
    text: z.string(),
});

const CreateNewsc = FormSchemaC.omit({ id: true });

export async function createNewsC(formData: FormData) {
    noStore();
    const rawFormData = {
        date: formData.get('date'),
        title: formData.get('title'),
        text: formData.get('text')
    }

    const { date, title, text } = CreateNewsC.parse(rawFormData);
    // console.log(date, title, text);

    try {
        await sql`
        INSERT INTO newsc (date, title, text)
        VALUES (${date}, ${title}, ${text})
        ON CONFLICT (id) DO NOTHING;
            `;


    } catch (error) {
        return {
            message: 'Database Error: Failed to Create News.',
        };
    }

    revalidatePath('/admin');
    // redirect('/admin')

}
//------------===============--------------




/*
CREATE TABLE news (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    date varchar(255) NOT NULL,
    title varchar(255) NOT NULL,
    text text NOT NULL
       );
       
CREATE TABLE newsB (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    date varchar(255) NOT NULL,
    title varchar(255) NOT NULL,
    img varchar(255) NOT NULL,
    text text NOT NULL
       );

INSERT INTO news (date, title, text)
        VALUES ('ddd', 'fff', 'fff')
        ON CONFLICT (id) DO NOTHING;

 CREATE TABLE newsc (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    date varchar(255) NOT NULL,
    title varchar(255) NOT NULL,
    text text NOT NULL
       );

 INSERT INTO newsc (date, title, text)
        VALUES ('ddd', 'fff', 'fff')
        ON CONFLICT (id) DO NOTHING;


DROP TABLE news;
*/



type NewsSchemaC = {
    id: string
    date: string
    title: string
    text: string
}

export async function fetchNewsCall() {
    noStore();
    try {
        const data = await sql<NewsSchemaC>`
        SELECT * FROM newsc
        ORDER BY newsc.date DESC
        `;
        return data.rows;

    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Failed to fetch revenue data.');
    }
}

export async function fetchNewsC(currentPage: number) {
    // const currentPage=1;
    
    const offset = (currentPage - 1) * ITEMS_PER_PAGE;
    noStore();
    try {
        const data = await sql<NewsSchemaC>`
        SELECT * FROM newsc
        ORDER BY newsc.date DESC
        LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
        `;
        return data.rows;

    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Failed to fetch revenue data.');
    }
}

export async function newsCount() {
    noStore();
    try {
        const nCount = await sql`
        SELECT COUNT(*)
        FROM newsc
        `
        console.log('nCount-->',nCount.rows[0].count);
        
        const totalNews = Number(nCount.rows[0].count);
        const totalPage = Math.ceil( totalNews/ ITEMS_PER_PAGE);
    return {totalNews, totalPage};
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Failed to fetch total number of News.');
    }
}


export async function deleteNews(id: string) {
    // throw new Error('Failed to Delete Invoice');
    console.log('id->', id);

    await sql`DELETE FROM newsc WHERE id = ${id}`;

    revalidatePath('/admin');
    revalidatePath('/');
}


const CreateNewsC = FormSchemaC.omit({ id: true });

export async function editNews(id: string, form: FormData) {
    const rawForm = {
        date: form.get('date'),
        title: form.get('title'),
        text: form.get('text'),
    }
    const { date, title, text } = CreateNewsC.parse(rawForm);


    await sql`
    UPDATE newsc
    SET id = ${id}, date = ${date}, title = ${title}, text = ${text}
    WHERE id = ${id}
  `;

    revalidatePath('/admin');
    redirect('/admin');

}


export async function authenticate(
    prevState: string | undefined,
    formData: FormData,
) {
    try {
        await signIn('credentials', formData);
    } catch (error) {
        if (error instanceof AuthError) {
            switch (error.type) {
                case 'CredentialsSignin':
                    return 'Invalid credentials.';
                default:
                    return 'Something went wrong.';
            }
        }
        throw error;
    }
}


//===================================================
