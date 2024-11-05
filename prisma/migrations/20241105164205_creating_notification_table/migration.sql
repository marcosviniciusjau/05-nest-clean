-- CreateTable
CREATE TABLE "notifications" (
    "id" TEXT NOT NULL,
    "recepient_id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "read_at" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "notifications_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "notifications" ADD CONSTRAINT "notifications_recepient_id_fkey" FOREIGN KEY ("recepient_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
