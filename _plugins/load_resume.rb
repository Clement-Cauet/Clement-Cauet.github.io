require 'json'
require 'net/http'
require 'uri'

module Jekyll
    class LoadResumeJson < Generator
        safe true

        def generate(site)
            gist_url = site.data['env']['gist_url']
            uri = URI.parse(gist_url)
            response = Net::HTTP.get_response(uri)

            if response.is_a?(Net::HTTPSuccess)
                site.data['resume'] = JSON.parse(response.body)
                Jekyll.logger.info "Resume JSON fetched successfully from Gist:", gist_url
            else
                Jekyll.logger.warn "Failed to fetch resume JSON from Gist:", gist_url
            end
        end
    end
end
