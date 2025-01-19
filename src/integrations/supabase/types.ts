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
      admin_logs: {
        Row: {
          action_type: string
          created_at: string | null
          details: string
          entity_id: string
          entity_name: string
          entity_type: string
          id: string
          user_email: string
        }
        Insert: {
          action_type: string
          created_at?: string | null
          details: string
          entity_id: string
          entity_name: string
          entity_type: string
          id?: string
          user_email: string
        }
        Update: {
          action_type?: string
          created_at?: string | null
          details?: string
          entity_id?: string
          entity_name?: string
          entity_type?: string
          id?: string
          user_email?: string
        }
        Relationships: []
      }
      blogs: {
        Row: {
          author: string
          average_rating: number | null
          category: string
          content: string
          created_at: string | null
          featured: boolean | null
          featured_in_category: boolean | null
          id: string
          image_url: string | null
          meta_description: string | null
          meta_keywords: string | null
          meta_title: string | null
          popular: boolean | null
          popular_in_entertainment: boolean | null
          popular_in_gadgets: boolean | null
          popular_in_games: boolean | null
          popular_in_stocks: boolean | null
          popular_in_tech: boolean | null
          share_count: number | null
          slug: string
          subcategory: string | null
          title: string
          updated_at: string | null
          view_count: number | null
        }
        Insert: {
          author: string
          average_rating?: number | null
          category: string
          content: string
          created_at?: string | null
          featured?: boolean | null
          featured_in_category?: boolean | null
          id?: string
          image_url?: string | null
          meta_description?: string | null
          meta_keywords?: string | null
          meta_title?: string | null
          popular?: boolean | null
          popular_in_entertainment?: boolean | null
          popular_in_gadgets?: boolean | null
          popular_in_games?: boolean | null
          popular_in_stocks?: boolean | null
          popular_in_tech?: boolean | null
          share_count?: number | null
          slug: string
          subcategory?: string | null
          title: string
          updated_at?: string | null
          view_count?: number | null
        }
        Update: {
          author?: string
          average_rating?: number | null
          category?: string
          content?: string
          created_at?: string | null
          featured?: boolean | null
          featured_in_category?: boolean | null
          id?: string
          image_url?: string | null
          meta_description?: string | null
          meta_keywords?: string | null
          meta_title?: string | null
          popular?: boolean | null
          popular_in_entertainment?: boolean | null
          popular_in_gadgets?: boolean | null
          popular_in_games?: boolean | null
          popular_in_stocks?: boolean | null
          popular_in_tech?: boolean | null
          share_count?: number | null
          slug?: string
          subcategory?: string | null
          title?: string
          updated_at?: string | null
          view_count?: number | null
        }
        Relationships: []
      }
      comments: {
        Row: {
          content: string
          content_id: string
          content_type: string
          created_at: string | null
          id: string
          turnstile_token: string | null
          updated_at: string | null
          user_email: string | null
          user_name: string
          verified: boolean | null
        }
        Insert: {
          content: string
          content_id: string
          content_type: string
          created_at?: string | null
          id?: string
          turnstile_token?: string | null
          updated_at?: string | null
          user_email?: string | null
          user_name?: string
          verified?: boolean | null
        }
        Update: {
          content?: string
          content_id?: string
          content_type?: string
          created_at?: string | null
          id?: string
          turnstile_token?: string | null
          updated_at?: string | null
          user_email?: string | null
          user_name?: string
          verified?: boolean | null
        }
        Relationships: []
      }
      expert_reviews: {
        Row: {
          author: string
          cons: string[]
          created_at: string | null
          date: string | null
          id: string
          product_id: string
          pros: string[]
          rating: number
          summary: string
          updated_at: string | null
          verdict: string
        }
        Insert: {
          author: string
          cons: string[]
          created_at?: string | null
          date?: string | null
          id?: string
          product_id: string
          pros: string[]
          rating: number
          summary: string
          updated_at?: string | null
          verdict: string
        }
        Update: {
          author?: string
          cons?: string[]
          created_at?: string | null
          date?: string | null
          id?: string
          product_id?: string
          pros?: string[]
          rating?: number
          summary?: string
          updated_at?: string | null
          verdict?: string
        }
        Relationships: []
      }
      laptops: {
        Row: {
          battery: string
          brand: string
          color: string | null
          connectivity_specs: Json | null
          created_at: string | null
          design_specs: Json | null
          display_details: Json | null
          display_specs: string
          gallery_images: string[] | null
          graphics: string | null
          id: string
          image_url: string | null
          model_name: string | null
          multimedia_specs: Json | null
          name: string
          os: string | null
          performance_specs: Json | null
          ports: string | null
          price: number
          processor: string
          ram: string
          storage: string
          updated_at: string | null
        }
        Insert: {
          battery: string
          brand: string
          color?: string | null
          connectivity_specs?: Json | null
          created_at?: string | null
          design_specs?: Json | null
          display_details?: Json | null
          display_specs: string
          gallery_images?: string[] | null
          graphics?: string | null
          id?: string
          image_url?: string | null
          model_name?: string | null
          multimedia_specs?: Json | null
          name: string
          os?: string | null
          performance_specs?: Json | null
          ports?: string | null
          price: number
          processor: string
          ram: string
          storage: string
          updated_at?: string | null
        }
        Update: {
          battery?: string
          brand?: string
          color?: string | null
          connectivity_specs?: Json | null
          created_at?: string | null
          design_specs?: Json | null
          display_details?: Json | null
          display_specs?: string
          gallery_images?: string[] | null
          graphics?: string | null
          id?: string
          image_url?: string | null
          model_name?: string | null
          multimedia_specs?: Json | null
          name?: string
          os?: string | null
          performance_specs?: Json | null
          ports?: string | null
          price?: number
          processor?: string
          ram?: string
          storage?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      mobile_products: {
        Row: {
          announced: string | null
          audio_jack: boolean | null
          available_colors: string[] | null
          bands_2g: string[] | null
          bands_3g: string[] | null
          bands_4g: string[] | null
          bands_5g: string[] | null
          battery: string
          battery_charging: Json | null
          battery_type: string | null
          bluetooth: string | null
          brand: string | null
          build_material: string | null
          camera: string
          camera_details: Json | null
          card_slot: boolean | null
          charging_specs: string | null
          chipset: string | null
          color: string | null
          cpu_details: string | null
          created_at: string | null
          design_specs: Json | null
          dimensions: string | null
          display_details: Json | null
          display_features: Json | null
          display_protection: string | null
          display_resolution: string | null
          display_size: string | null
          display_specs: string
          display_type: string | null
          gallery_images: string[] | null
          general_specs: Json | null
          gps: string | null
          gpu_details: string | null
          id: string
          image_url: string | null
          infrared: boolean | null
          loudspeaker_type: string | null
          main_camera_features: Json | null
          main_camera_specs: Json | null
          main_camera_video: Json | null
          memory_type: string | null
          model_name: string | null
          model_variants: string[] | null
          multimedia_specs: Json | null
          name: string
          network_specs: Json | null
          network_speed: string | null
          network_technology: string | null
          nfc: boolean | null
          os: string | null
          performance_specs: Json | null
          price: number
          processor: string
          protection_rating: string | null
          radio: boolean | null
          ram: string | null
          resolution: string | null
          screen_size: string | null
          selfie_camera_features: Json | null
          selfie_camera_specs: Json | null
          selfie_camera_video: Json | null
          sensor_specs: Json | null
          sensors: string[] | null
          sim_type: string | null
          status: string | null
          storage: string | null
          updated_at: string | null
          usb_type: string | null
          weight: string | null
          wlan: string | null
        }
        Insert: {
          announced?: string | null
          audio_jack?: boolean | null
          available_colors?: string[] | null
          bands_2g?: string[] | null
          bands_3g?: string[] | null
          bands_4g?: string[] | null
          bands_5g?: string[] | null
          battery: string
          battery_charging?: Json | null
          battery_type?: string | null
          bluetooth?: string | null
          brand?: string | null
          build_material?: string | null
          camera: string
          camera_details?: Json | null
          card_slot?: boolean | null
          charging_specs?: string | null
          chipset?: string | null
          color?: string | null
          cpu_details?: string | null
          created_at?: string | null
          design_specs?: Json | null
          dimensions?: string | null
          display_details?: Json | null
          display_features?: Json | null
          display_protection?: string | null
          display_resolution?: string | null
          display_size?: string | null
          display_specs: string
          display_type?: string | null
          gallery_images?: string[] | null
          general_specs?: Json | null
          gps?: string | null
          gpu_details?: string | null
          id?: string
          image_url?: string | null
          infrared?: boolean | null
          loudspeaker_type?: string | null
          main_camera_features?: Json | null
          main_camera_specs?: Json | null
          main_camera_video?: Json | null
          memory_type?: string | null
          model_name?: string | null
          model_variants?: string[] | null
          multimedia_specs?: Json | null
          name: string
          network_specs?: Json | null
          network_speed?: string | null
          network_technology?: string | null
          nfc?: boolean | null
          os?: string | null
          performance_specs?: Json | null
          price: number
          processor: string
          protection_rating?: string | null
          radio?: boolean | null
          ram?: string | null
          resolution?: string | null
          screen_size?: string | null
          selfie_camera_features?: Json | null
          selfie_camera_specs?: Json | null
          selfie_camera_video?: Json | null
          sensor_specs?: Json | null
          sensors?: string[] | null
          sim_type?: string | null
          status?: string | null
          storage?: string | null
          updated_at?: string | null
          usb_type?: string | null
          weight?: string | null
          wlan?: string | null
        }
        Update: {
          announced?: string | null
          audio_jack?: boolean | null
          available_colors?: string[] | null
          bands_2g?: string[] | null
          bands_3g?: string[] | null
          bands_4g?: string[] | null
          bands_5g?: string[] | null
          battery?: string
          battery_charging?: Json | null
          battery_type?: string | null
          bluetooth?: string | null
          brand?: string | null
          build_material?: string | null
          camera?: string
          camera_details?: Json | null
          card_slot?: boolean | null
          charging_specs?: string | null
          chipset?: string | null
          color?: string | null
          cpu_details?: string | null
          created_at?: string | null
          design_specs?: Json | null
          dimensions?: string | null
          display_details?: Json | null
          display_features?: Json | null
          display_protection?: string | null
          display_resolution?: string | null
          display_size?: string | null
          display_specs?: string
          display_type?: string | null
          gallery_images?: string[] | null
          general_specs?: Json | null
          gps?: string | null
          gpu_details?: string | null
          id?: string
          image_url?: string | null
          infrared?: boolean | null
          loudspeaker_type?: string | null
          main_camera_features?: Json | null
          main_camera_specs?: Json | null
          main_camera_video?: Json | null
          memory_type?: string | null
          model_name?: string | null
          model_variants?: string[] | null
          multimedia_specs?: Json | null
          name?: string
          network_specs?: Json | null
          network_speed?: string | null
          network_technology?: string | null
          nfc?: boolean | null
          os?: string | null
          performance_specs?: Json | null
          price?: number
          processor?: string
          protection_rating?: string | null
          radio?: boolean | null
          ram?: string | null
          resolution?: string | null
          screen_size?: string | null
          selfie_camera_features?: Json | null
          selfie_camera_specs?: Json | null
          selfie_camera_video?: Json | null
          sensor_specs?: Json | null
          sensors?: string[] | null
          sim_type?: string | null
          status?: string | null
          storage?: string | null
          updated_at?: string | null
          usb_type?: string | null
          weight?: string | null
          wlan?: string | null
        }
        Relationships: []
      }
      product_ratings: {
        Row: {
          created_at: string | null
          id: string
          product_id: string
          rating: number
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          product_id: string
          rating: number
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          product_id?: string
          rating?: number
          updated_at?: string | null
        }
        Relationships: []
      }
      product_reviews: {
        Row: {
          created_at: string | null
          id: string
          product_id: string
          rating: number
          review_text: string | null
          updated_at: string | null
          user_name: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          product_id: string
          rating: number
          review_text?: string | null
          updated_at?: string | null
          user_name: string
        }
        Update: {
          created_at?: string | null
          id?: string
          product_id?: string
          rating?: number
          review_text?: string | null
          updated_at?: string | null
          user_name?: string
        }
        Relationships: []
      }
      ratings: {
        Row: {
          blog_id: string
          created_at: string | null
          id: string
          rating: number
          updated_at: string | null
        }
        Insert: {
          blog_id: string
          created_at?: string | null
          id?: string
          rating: number
          updated_at?: string | null
        }
        Update: {
          blog_id?: string
          created_at?: string | null
          id?: string
          rating?: number
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "ratings_blog_id_fkey"
            columns: ["blog_id"]
            isOneToOne: false
            referencedRelation: "blogs"
            referencedColumns: ["id"]
          },
        ]
      }
      reviews: {
        Row: {
          content_id: string
          content_type: string
          created_at: string | null
          id: string
          rating: number
          review_text: string | null
          updated_at: string | null
        }
        Insert: {
          content_id: string
          content_type: string
          created_at?: string | null
          id?: string
          rating: number
          review_text?: string | null
          updated_at?: string | null
        }
        Update: {
          content_id?: string
          content_type?: string
          created_at?: string | null
          id?: string
          rating?: number
          review_text?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      calculate_average_rating: {
        Args: {
          content_id: string
          content_type: string
        }
        Returns: number
      }
      calculate_blog_rating: {
        Args: {
          blog_id: string
        }
        Returns: number
      }
      calculate_product_rating: {
        Args: {
          p_id: string
        }
        Returns: {
          average_rating: number
          total_ratings: number
          rating_distribution: number[]
        }[]
      }
      create_ratings_table: {
        Args: Record<PropertyKey, never>
        Returns: undefined
      }
      increment_share_count: {
        Args: {
          blog_id: string
        }
        Returns: undefined
      }
      increment_view_count: {
        Args: {
          blog_id: string
        }
        Returns: undefined
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

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never