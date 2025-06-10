import { Schema as S, type Entity } from "@triplit/client";

const isUid = ["userId", "=", "$token.sub"] as const;

export const schema = S.Collections({
  users: {
    schema: S.Schema({
      id: S.Id(),
      name: S.String(),
      email: S.String(),
      emailVerified: S.Boolean({ default: false }),
      image: S.Optional(S.String()),
      createdAt: S.Date({ default: S.Default.now() }),
      updatedAt: S.Date({ default: S.Default.now() }),
      church: S.String(),
      birthdate: S.Date(),
      role: S.Optional(S.String({ default: "user" })),
      banned: S.Boolean({ default: false }),
      bannedReason: S.Optional(S.String()),
      banExpires: S.Optional(S.Date()),
      stripeCustomerId: S.Optional(S.String()),
    }),
    relationships: {
      sessions: S.RelationMany("sessions", {
        where: [["userId", "=", "$id"]],
      }),
      accounts: S.RelationMany("accounts", {
        where: [["userId", "=", "$id"]],
      }),
      todos: S.RelationMany("todos", {
        //                     ↑ referenced table name
        //         ↓ field in referenced table
        where: [["userId", "=", "$id"]],
        //                        ↑ field in this table
      }),
      purchases: S.RelationMany("purchases", {
        where: [["userId", "=", "$id"]],
      }),
      userCourseAccess: S.RelationMany("userCourseAccess", {
        where: [["userId", "=", "$id"]],
      }),
      userLessonCompletion: S.RelationMany("userLessonCompletion", {
        where: [["userId", "=", "$id"]],
      }),
      userLessonAttendance: S.RelationMany("userLessonAttendance", {
        where: [["userId", "=", "$id"]],
      }),
    },
    permissions: {
      authenticated: {
        read: {
          filter: [["id", "=", "$token.sub"]],
        },
      },
    },
  },
  sessions: {
    schema: S.Schema({
      id: S.Id(),
      userId: S.String(),
      token: S.String(),
      expiresAt: S.Date(),
      ipAddress: S.Optional(S.String()),
      userAgent: S.Optional(S.String()),
      createdAt: S.Date({ default: S.Default.now() }),
      updatedAt: S.Date({ default: S.Default.now() }),
      impersonatedBy: S.Optional(S.String()),
    }),
    relationships: {
      //                      ↓ referenced table name
      user: S.RelationById("users", "$userId"),
      //                                ↑ field in this table
    },
    permissions: {
      authenticated: {
        read: {
          filter: [isUid],
        },
      },
    },
  },
  accounts: {
    schema: S.Schema({
      id: S.Id(),
      userId: S.String(),
      accountId: S.String(),
      providerId: S.String(),
      accessToken: S.Optional(S.String()),
      refreshToken: S.Optional(S.String()),
      accessTokenExpiresAt: S.Optional(S.Date()),
      refreshTokenExpiresAt: S.Optional(S.Date()),
      scope: S.Optional(S.String()),
      idToken: S.Optional(S.String()),
      password: S.Optional(S.String()),
      createdAt: S.Date({ default: S.Default.now() }),
      updatedAt: S.Date({ default: S.Default.now() }),
    }),
    relationships: {
      user: S.RelationById("users", "$userId"),
    },
    permissions: {
      authenticated: {
        read: {
          filter: [isUid],
        },
      },
    },
  },
  verifications: {
    schema: S.Schema({
      id: S.Id(),
      identifier: S.String(),
      value: S.String(),
      expiresAt: S.Date(),
      createdAt: S.Date({ default: S.Default.now() }),
      updatedAt: S.Date({ default: S.Default.now() }),
    }),
    permissions: {},
  },
  todos: {
    schema: S.Schema({
      id: S.Id(),
      text: S.String(),
      completed: S.Boolean({ default: false }),
      created_at: S.Date({ default: new Date() }),
      updated_at: S.Date({ default: new Date() }),
      order: S.Number({ default: 0 }),
      userId: S.String(),
    }),
    relationships: {
      //                      ↓ referenced table name
      user: S.RelationById("users", "$userId"),
      //                                ↑ field in this table
    },
    permissions: {
      authenticated: {
        read: {
          filter: [isUid],
        },
        insert: {
          filter: [isUid],
        },
        update: {
          filter: [isUid],
        },
        postUpdate: {
          filter: [isUid],
        },
        delete: {
          filter: [isUid],
        },
      },
    },
  },
  courses: {
    schema: S.Schema({
      id: S.Id(),
      name: S.String(),
      description: S.String(),
      createdAt: S.Date({ default: new Date() }),
      updatedAt: S.Date({ default: new Date() }),
    }),
    relationships: {
      courseSections: S.RelationMany("courseSections", {
        //                              ↑ referenced table name
        //         ↓ field in referenced table
        where: [["courseId", "=", "$id"]],
        //                        ↑ field in this table
      }),
      courseProducts: S.RelationMany("courseProducts", {
        where: [["courseId", "=", "$id"]],
      }),
      userCourseAccess: S.RelationMany("userCourseAccess", {
        where: [["courseId", "=", "$id"]],
      }),
    },
  },
  courseProducts: {
    schema: S.Schema({
      id: S.Id(),
      courseId: S.String(),
      productId: S.String(),
      createdAt: S.Date({ default: new Date() }),
      updatedAt: S.Date({ default: new Date() }),
    }),
    relationships: {
      //                      ↓ referenced table name
      course: S.RelationById("courses", "$courseId"),
      //                                ↑ field in this table
      product: S.RelationById("products", "$productId"),
    },
  },
  courseSections: {
    schema: S.Schema({
      id: S.Id(),
      name: S.String(),
      description: S.String(),
      visibility: S.String({
        enum: ["public", "private", "preview"],
        default: "private",
      }),
      courseId: S.String(),
      createdAt: S.Date({ default: new Date() }),
      updatedAt: S.Date({ default: new Date() }),
    }),
    relationships: {
      //                      ↓ referenced table name
      course: S.RelationById("courses", "$courseId"),
      //                                ↑ field in this table
      lessons: S.RelationMany("lessons", {
        //                     ↑ referenced table name
        //         ↓ field in referenced table
        where: [["sectionId", "=", "$id"]],
        //                        ↑ field in this table
      }),
    },
  },
  lessons: {
    schema: S.Schema({
      id: S.Id(),
      name: S.String(),
      description: S.String(),
      youtubeVideoId: S.String(),
      order: S.Number({ default: 0 }),
      visibility: S.String({
        enum: ["public", "private", "preview"],
        default: "private",
      }),
      sectionId: S.Id({ format: "uuidv4" }),
      createdAt: S.Date({ default: new Date() }),
      updatedAt: S.Date({ default: new Date() }),
    }),
    relationships: {
      userLessonCompletion: S.RelationMany("userLessonCompletion", {
        //                     ↑ referenced table name
        //         ↓ field in referenced table
        where: [["lessonId", "=", "$id"]],
        //                        ↑ field in this table
      }),
      userLessonAttendance: S.RelationMany("userLessonAttendance", {
        //                     ↑ referenced table name
        //         ↓ field in referenced table
        where: [["lessonId", "=", "$id"]],
        //                        ↑ field in this table
      }),
      //                      ↓ referenced table name
      courseSection: S.RelationById("courseSections", "$sectionId"),
      //                                ↑ field in this table
    },
  },
  products: {
    schema: S.Schema({
      id: S.Id(),
      name: S.String(),
      description: S.String(),
      imageUrl: S.String(),
      priceInCents: S.Number(),
      visibility: S.String({
        enum: ["public", "private"],
        default: "private",
      }),
      createdAt: S.Date({ default: new Date() }),
      updatedAt: S.Date({ default: new Date() }),
    }),
    relationships: {
      courseProducts: S.RelationMany("courseProducts", {
        where: [["productId", "=", "$id"]],
      }),
      //                          ↓ referenced table name
      purchase: S.RelationById("purchases", "$id"),
      //                                         ↑ field in this table
    },
  },
  purchases: {
    schema: S.Schema({
      id: S.Id(),
      pricePaidInCents: S.Number(),
      productDetails: S.Record({
        courseProducts: S.String(),
        name: S.String(),
        description: S.String(),
        imageUrl: S.String(),
      }),
      userId: S.String(),
      productId: S.String(),
      stripeSessionId: S.String(),
      refundedAt: S.Optional(S.Date()),
      createdAt: S.Date({ default: new Date() }),
      updatedAt: S.Date({ default: new Date() }),
    }),
    relationships: {
      user: S.RelationById("users", "$userId"),
      product: S.RelationById("products", "$productId"),
    },
    permissions: {
      authenticated: {
        read: { filter: [isUid] },
      },
    },
  },
  userCourseAccess: {
    schema: S.Schema({
      id: S.Id(),
      userId: S.String(),
      courseId: S.String(),
      createdAt: S.Date({ default: new Date() }),
      updatedAt: S.Date({ default: new Date() }),
    }),
    relationships: {
      //                      ↓ referenced table name
      course: S.RelationById("courses", "$courseId"),
      //                                ↑ field in this table
      user: S.RelationById("users", "$userId"),
    },
  },
  userLessonAttendance: {
    schema: S.Schema({
      id: S.Id(),
      userId: S.String(),
      lessonId: S.String(),
      status: S.String({
        enum: ["absent", "present"],
        default: "absent",
      }),
      type: S.String({
        enum: ["lesson", "practice"],
        default: "lesson",
      }),
      createdAt: S.Date({ default: new Date() }),
      updatedAt: S.Date({ default: new Date() }),
    }),
    relationships: {
      user: S.RelationById("users", "$userId"),
      lesson: S.RelationById("lessons", "$lessonId"),
    },
    permissions: {
      authenticated: {
        read: { filter: [isUid] },
      },
    },
  },
  userLessonCompletion: {
    schema: S.Schema({
      id: S.Id(),
      userId: S.String(),
      lessonId: S.String(),
      createdAt: S.Date({ default: new Date() }),
      updatedAt: S.Date({ default: new Date() }),
    }),
    relationships: {
      user: S.RelationById("users", "$userId"),
      lesson: S.RelationById("lessons", "$lessonId"),
    },
    permissions: {
      authenticated: {
        read: { filter: [isUid] },
      },
    },
  },
  subscriptions: {
    schema: S.Schema({
      id: S.Id(),
      userId: S.Optional(S.String()),
      plan: S.String(),
      referenceId: S.String(),
      stripeCustomerId: S.Optional(S.String()),
      stripeSubscriptionId: S.Optional(S.String()),
      status: S.String({
        enum: [
          "active",
          "canceled",
          "past_due",
          "unpaid",
          "incomplete",
          "trialing",
        ],
        default: "active",
      }),
      periodStart: S.Optional(S.Date()),
      periodEnd: S.Optional(S.Date()),
      cancelAtPeriodEnd: S.Optional(S.Boolean({ default: false })),
      seats: S.Optional(S.Number()),
      trialStart: S.Optional(S.Date()),
      trialEnd: S.Optional(S.Date()),
      createdAt: S.Date({ default: S.Default.now() }),
      updatedAt: S.Date({ default: S.Default.now() }),
    }),
    relationships: {
      user: S.RelationById("users", "$userId"),
    },
    permissions: {
      authenticated: {
        read: { filter: [isUid] },
      },
    },
  },
});

export type User = Entity<typeof schema, "users">;
export type Session = Entity<typeof schema, "sessions">;
export type Account = Entity<typeof schema, "accounts">;
export type Verification = Entity<typeof schema, "verifications">;
export type Todo = Entity<typeof schema, "todos">;
export type Course = Entity<typeof schema, "courses">;
export type CourseProduct = Entity<typeof schema, "courseProducts">;
export type CourseSection = Entity<typeof schema, "courseSections">;
export type Lesson = Entity<typeof schema, "lessons">;
export type Product = Entity<typeof schema, "products">;
export type Purchase = Entity<typeof schema, "purchases">;
export type UserCourseAccess = Entity<typeof schema, "userCourseAccess">;
export type UserLessonAttendance = Entity<
  typeof schema,
  "userLessonAttendance"
>;
export type UserLessonCompletion = Entity<
  typeof schema,
  "userLessonCompletion"
>;
export type Subscription = Entity<typeof schema, "subscriptions">;
