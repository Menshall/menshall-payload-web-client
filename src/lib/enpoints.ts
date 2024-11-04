import {
  AcademyProgram,
  AcademyTeachers,
  Account,
  Barbers,
  Contact,
  Footer,
  Header,
  Page,
  Post,
  Reviews,
  Schedule,
  Service,
  Settings,
  Social,
} from "@/payload-types";
import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";

export const getServices = async (): Promise<Service> => {
  try {
    const client = await clientPromise;
    const db = client.db("menshall-payload-web-admin");
    const data = await db
      .collection("globals")
      .find({ globalType: "services" })
      .toArray();
    return data[0] as unknown as Service;
  } catch (error) {
    throw new Error("fetch service failed");
  }
};

export const getHeader = async (): Promise<Header> => {
  try {
    const client = await clientPromise;
    const db = client.db("menshall-payload-web-admin");
    const data = await db
      .collection("globals")
      .find({ globalType: "header" })
      .toArray();
    return data[0] as unknown as Header;
  } catch (error) {
    throw new Error("fetch header failed");
  }
};

export const getContacts = async (): Promise<Contact> => {
  try {
    const client = await clientPromise;
    const db = client.db("menshall-payload-web-admin");
    const data = await db
      .collection("globals")
      .find({ globalType: "contacts" })
      .toArray();
    return data[0] as unknown as Contact;
  } catch (error) {
    throw new Error("fetch contacts failed");
  }
};

export const getSettings = async (): Promise<Settings> => {
  try {
    const client = await clientPromise;
    const db = client.db("menshall-payload-web-admin");
    const data = await db
      .collection("globals")
      .find({ globalType: "settings" })
      .toArray();
    return data[0] as unknown as Settings;
  } catch (error) {
    throw new Error("fetch settings failed");
  }
};

export const getFooter = async (): Promise<Footer> => {
  try {
    const client = await clientPromise;
    const db = client.db("menshall-payload-web-admin");
    const data = await db
      .collection("globals")
      .find({ globalType: "footer" })
      .toArray();
    return data[0] as unknown as Footer;
  } catch (error) {
    throw new Error("fetch footer failed");
  }
};

export const getBarbers = async (): Promise<Barbers> => {
  try {
    const client = await clientPromise;
    const db = client.db("menshall-payload-web-admin");
    const data = await db
      .collection("globals")
      .find({ globalType: "barbers" })
      .toArray();
    return data[0] as unknown as Barbers;
  } catch (error) {
    throw new Error("fetch barbers failed");
  }
};

export const getReviews = async (): Promise<Reviews> => {
  try {
    const client = await clientPromise;
    const db = client.db("menshall-payload-web-admin");
    const data = await db
      .collection("globals")
      .find({ globalType: "reviews" })
      .toArray();
    return data[0] as unknown as Reviews;
  } catch (error) {
    throw new Error("fetch reviews failed");
  }
};

export const getAccount = async (): Promise<Account> => {
  try {
    const client = await clientPromise;
    const db = client.db("menshall-payload-web-admin");
    const data = await db
      .collection("globals")
      .find({ globalType: "account" })
      .toArray();
    return data[0] as unknown as Account;
  } catch (error) {
    throw new Error("fetch account failed");
  }
};

export const getSchedule = async (): Promise<Schedule> => {
  try {
    const client = await clientPromise;
    const db = client.db("menshall-payload-web-admin");
    const data = await db
      .collection("globals")
      .find({ globalType: "schedule" })
      .toArray();
    return data[0] as unknown as Schedule;
  } catch (error) {
    throw new Error("fetch schedule failed");
  }
};

export const getSocials = async (): Promise<Social> => {
  try {
    const client = await clientPromise;
    const db = client.db("menshall-payload-web-admin");
    const data = await db
      .collection("globals")
      .find({ globalType: "socials" })
      .toArray();
    return data[0] as unknown as Social;
  } catch (error) {
    throw new Error("fetch socials failed");
  }
};

export const getAcademyTeachers = async (): Promise<AcademyTeachers> => {
  try {
    const client = await clientPromise;
    const db = client.db("menshall-payload-web-admin");
    const data = await db
      .collection("globals")
      .find({ globalType: "academyTeachers" })
      .toArray();
    return data[0] as unknown as AcademyTeachers;
  } catch (error) {
    throw new Error("fetch academyTeachers failed");
  }
};

export const getAcademyProgram = async (): Promise<AcademyProgram> => {
  try {
    const client = await clientPromise;
    const db = client.db("menshall-payload-web-admin");
    const data = await db
      .collection("globals")
      .find({ globalType: "academyProgram" })
      .toArray();
    return data[0] as unknown as AcademyProgram;
  } catch (error) {
    throw new Error("fetch academyProgram failed");
  }
};

export const getPage = async (slug: string, meta?: boolean): Promise<Page> => {
  try {
    const client = await clientPromise;
    const db = client.db("menshall-payload-web-admin");
    if (meta && slug) {
      const projection = { _id: 0, meta: 1, banner: 1 };
      const data = await db
        .collection("pages")
        .find({ slug })
        .project(projection)
        .toArray();
      return data[0] as unknown as Page;
    }
    const data = await db.collection("pages").find({ slug }).toArray();
    return data[0] as unknown as Page;
  } catch (error) {
    throw new Error("fetch page failed");
  }
};

export const getPages = async (): Promise<Array<Page>> => {
  try {
    const client = await clientPromise;
    const db = client.db("menshall-payload-web-admin");

    const data = await db.collection("pages").find({}).toArray();

    return data as unknown as Array<Page>;
  } catch (error) {
    throw new Error("fetch page failed");
  }
};

export const getPosts = async (): Promise<Array<Post>> => {
  try {
    const client = await clientPromise;
    const db = client.db("menshall-payload-web-admin");
    const projection = {
      _id: 0,
      createdAt: 1,
      title: 1,
      slug: 1,
      postImage: 1,
    };
    const data = await db
      .collection("posts")
      .find({})
      .project(projection)
      .toArray();

    return data as unknown as Array<Post>;
  } catch (error) {
    throw new Error("fetch academyProgram failed");
  }
};

export const getPost = async (slug: string, meta?: boolean): Promise<Post> => {
  try {
    const client = await clientPromise;
    const db = client.db("menshall-payload-web-admin");
    if (meta && slug) {
      const projection = { _id: 0, meta: 1, postImage: 1 };
      const data = await db
        .collection("posts")
        .find({ slug })
        .project(projection)
        .toArray();
      return data[0] as unknown as Post;
    }

    const data = await db.collection("posts").find({ slug }).toArray();
    return data[0] as unknown as Post;
  } catch (error) {
    throw new Error("fetch academyProgram failed");
  }
};

export const getPostsById = async (
  ids: Array<string>,
): Promise<Array<Post>> => {
  try {
    const client = await clientPromise;
    const db = client.db("menshall-payload-web-admin");
    const objectIds = ids.map((id) => new ObjectId(id));
    const data = db
      .collection("posts")
      .find({
        _id: { $in: objectIds },
      })
      .toArray();

    return data as unknown as Array<Post>;
  } catch (error) {
    throw new Error("fetch academyProgram failed");
  }
};

export async function getPostsByCategoryId(categoryId: string) {
  try {
    const client = await clientPromise;
    const db = client.db("menshall-payload-web-admin");
    const projection = {
      _id: 0,
      createdAt: 1,
      title: 1,
      slug: 1,
      postImage: 1,
    };
    const data = await db
      .collection("posts")
      .find({
        categories: { $elemMatch: { $eq: categoryId } },
      })
      .project(projection)
      .toArray();
    return data as Array<Post>;
  } catch (error) {
    throw new Error("fetch academyProgram failed");
  }
}

export const getAllMedia = async (): Promise<
  Array<{
    filename: string;
    height: number;
    width: number;
    _id: string;
  }>
> => {
  try {
    const client = await clientPromise;
    const db = client.db("menshall-payload-web-admin");
    const projection = { filename: 1, height: 1, width: 1, _key: 1 };

    const data = await db
      .collection("media")
      .find({})
      .project(projection)
      .toArray();

    return data as unknown as Array<{
      filename: string;
      height: number;
      width: number;
      _id: string;
    }>;
  } catch (error) {
    throw new Error("fetch academyProgram failed");
  }
};

export const getMediaById = async (
  id: string,
): Promise<{
  filename: string;
  height: number;
  width: number;
  _key: string;
  _id: string;
}> => {
  try {
    const client = await clientPromise;
    const db = client.db("menshall-payload-web-admin");
    const projection = { filename: 1, height: 1, width: 1, _key: 1 };
    const mediaId = new ObjectId(id);

    const data = await db
      .collection("media")
      .find({ _id: mediaId })
      .project(projection)
      .toArray();

    return data[0] as unknown as {
      filename: string;
      height: number;
      width: number;
      _key: string;
      _id: string;
    };
  } catch (error) {
    throw new Error("fetch academyProgram failed");
  }
};
