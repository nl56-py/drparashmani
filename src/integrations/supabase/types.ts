export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      blog_posts: {
        Row: {
          author: string | null
          content_en: string
          content_np: string
          created_at: string
          excerpt_en: string
          excerpt_np: string
          id: string
          image_url: string | null
          og_image_url: string | null
          published: boolean
          seo_desc_en: string | null
          seo_desc_np: string | null
          seo_keywords_en: string | null
          seo_keywords_np: string | null
          seo_title_en: string | null
          seo_title_np: string | null
          slug: string
          title_en: string
          title_np: string
          updated_at: string
        }
        Insert: {
          author?: string | null
          content_en: string
          content_np: string
          created_at?: string
          excerpt_en: string
          excerpt_np: string
          id?: string
          image_url?: string | null
          og_image_url?: string | null
          published?: boolean
          seo_desc_en?: string | null
          seo_desc_np?: string | null
          seo_keywords_en?: string | null
          seo_keywords_np?: string | null
          seo_title_en?: string | null
          seo_title_np?: string | null
          slug: string
          title_en: string
          title_np: string
          updated_at?: string
        }
        Update: {
          author?: string | null
          content_en?: string
          content_np?: string
          created_at?: string
          excerpt_en?: string
          excerpt_np?: string
          id?: string
          image_url?: string | null
          og_image_url?: string | null
          published?: boolean
          seo_desc_en?: string | null
          seo_desc_np?: string | null
          seo_keywords_en?: string | null
          seo_keywords_np?: string | null
          seo_title_en?: string | null
          seo_title_np?: string | null
          slug?: string
          title_en?: string
          title_np?: string
          updated_at?: string
        }
        Relationships: []
      }
      contact_views: {
        Row: {
          contact_id: string
          id: string
          viewed_at: string | null
          viewer_id: string
        }
        Insert: {
          contact_id: string
          id?: string
          viewed_at?: string | null
          viewer_id: string
        }
        Update: {
          contact_id?: string
          id?: string
          viewed_at?: string | null
          viewer_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "contact_views_contact_id_fkey"
            columns: ["contact_id"]
            isOneToOne: false
            referencedRelation: "contacts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "contact_views_viewer_id_fkey"
            columns: ["viewer_id"]
            isOneToOne: false
            referencedRelation: "users_with_emails"
            referencedColumns: ["id"]
          },
        ]
      }
      contacts: {
        Row: {
          created_at: string
          email: string | null
          id: string
          message: string
          name: string
          phone: string
        }
        Insert: {
          created_at?: string
          email?: string | null
          id?: string
          message: string
          name: string
          phone: string
        }
        Update: {
          created_at?: string
          email?: string | null
          id?: string
          message?: string
          name?: string
          phone?: string
        }
        Relationships: []
      }
      lecture_images: {
        Row: {
          alt_text_en: string | null
          alt_text_np: string | null
          created_at: string | null
          display_order: number | null
          id: string
          image_url: string
          lecture_id: string | null
        }
        Insert: {
          alt_text_en?: string | null
          alt_text_np?: string | null
          created_at?: string | null
          display_order?: number | null
          id?: string
          image_url: string
          lecture_id?: string | null
        }
        Update: {
          alt_text_en?: string | null
          alt_text_np?: string | null
          created_at?: string | null
          display_order?: number | null
          id?: string
          image_url?: string
          lecture_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "lecture_images_lecture_id_fkey"
            columns: ["lecture_id"]
            isOneToOne: false
            referencedRelation: "lectures_abroad"
            referencedColumns: ["id"]
          },
        ]
      }
      lectures_abroad: {
        Row: {
          audience_en: string | null
          audience_np: string | null
          badge_en: string | null
          badge_np: string | null
          created_at: string | null
          date_en: string
          date_np: string | null
          description_en: string | null
          description_np: string | null
          highlights: string[] | null
          id: string
          location_en: string
          location_np: string | null
          slug: string
          title_en: string
          title_np: string | null
          topics: string[] | null
          type: string
          updated_at: string | null
          venue_en: string
          venue_np: string | null
        }
        Insert: {
          audience_en?: string | null
          audience_np?: string | null
          badge_en?: string | null
          badge_np?: string | null
          created_at?: string | null
          date_en: string
          date_np?: string | null
          description_en?: string | null
          description_np?: string | null
          highlights?: string[] | null
          id?: string
          location_en: string
          location_np?: string | null
          slug: string
          title_en: string
          title_np?: string | null
          topics?: string[] | null
          type: string
          updated_at?: string | null
          venue_en: string
          venue_np?: string | null
        }
        Update: {
          audience_en?: string | null
          audience_np?: string | null
          badge_en?: string | null
          badge_np?: string | null
          created_at?: string | null
          date_en?: string
          date_np?: string | null
          description_en?: string | null
          description_np?: string | null
          highlights?: string[] | null
          id?: string
          location_en?: string
          location_np?: string | null
          slug?: string
          title_en?: string
          title_np?: string | null
          topics?: string[] | null
          type?: string
          updated_at?: string | null
          venue_en?: string
          venue_np?: string | null
        }
        Relationships: []
      }
      roles: {
        Row: {
          created_at: string
          id: string
          role: string
          type: string | null
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role: string
          type?: string | null
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: string
          type?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "roles_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users_with_emails"
            referencedColumns: ["id"]
          },
        ]
      }
      videos: {
        Row: {
          category_en: string | null
          category_np: string | null
          created_at: string
          date_en: string | null
          date_np: string | null
          description_en: string | null
          description_np: string | null
          embed_url: string
          featured: boolean
          id: string
          og_image_url: string | null
          seo_desc_en: string | null
          seo_desc_np: string | null
          seo_keywords_en: string | null
          seo_keywords_np: string | null
          seo_title_en: string | null
          seo_title_np: string | null
          slug: string | null
          title_en: string
          title_np: string
        }
        Insert: {
          category_en?: string | null
          category_np?: string | null
          created_at?: string
          date_en?: string | null
          date_np?: string | null
          description_en?: string | null
          description_np?: string | null
          embed_url: string
          featured?: boolean
          id?: string
          og_image_url?: string | null
          seo_desc_en?: string | null
          seo_desc_np?: string | null
          seo_keywords_en?: string | null
          seo_keywords_np?: string | null
          seo_title_en?: string | null
          seo_title_np?: string | null
          slug?: string | null
          title_en: string
          title_np: string
        }
        Update: {
          category_en?: string | null
          category_np?: string | null
          created_at?: string
          date_en?: string | null
          date_np?: string | null
          description_en?: string | null
          description_np?: string | null
          embed_url?: string
          featured?: boolean
          id?: string
          og_image_url?: string | null
          seo_desc_en?: string | null
          seo_desc_np?: string | null
          seo_keywords_en?: string | null
          seo_keywords_np?: string | null
          seo_title_en?: string | null
          seo_title_np?: string | null
          slug?: string | null
          title_en?: string
          title_np?: string
        }
        Relationships: []
      }
    }
    Views: {
      users_with_emails: {
        Row: {
          email: string | null
          id: string | null
        }
        Insert: {
          email?: string | null
          id?: string | null
        }
        Update: {
          email?: string | null
          id?: string | null
        }
        Relationships: []
      }
    }
    Functions: {
      count_admin_roles: {
        Args: Record<PropertyKey, never>
        Returns: number
      }
      create_users_view: {
        Args: Record<PropertyKey, never>
        Returns: boolean
      }
      generate_lecture_slug: {
        Args: { title_en: string }
        Returns: string
      }
      has_role: {
        Args: { user_id: string; role_name: string }
        Returns: boolean
      }
      has_role_type: {
        Args: { user_id: string; role_name: string; role_type: string }
        Returns: boolean
      }
      is_admin: {
        Args: { user_id: string }
        Returns: boolean
      }
      is_contacts_admin: {
        Args: { user_id: string }
        Returns: boolean
      }
      is_content_admin: {
        Args: { user_id: string }
        Returns: boolean
      }
      is_super_admin: {
        Args: { user_id: string }
        Returns: boolean
      }
      is_viewer: {
        Args: { user_id: string }
        Returns: boolean
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
