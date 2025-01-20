require 'dotenv'

module Jekyll
    class LoadEnvVariables < Generator
        safe true
        priority :highest

        def generate(site)
            Dotenv.load

            site.data['env'] = {
                "gist_url" => ENV['GIST_URL'] || 'https://default-gist-url.com',
                "owner_name" => ENV['OWNER_NAME'] || 'Default-Owner'
            }

            Jekyll.logger.info "Environment variables loaded successfully: #{site.data['env']}"
        end
    end
end
